
import axios, { AxiosError } from "axios";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";
import { cached } from "../utils/cache";
import type {
  AirQuality, CurrentWeather, DailyPoint, HourlyPoint, Location, WeatherDashboard,
} from "../types/weather";

const http = axios.create({
  baseURL: "https://api.openweathermap.org",
  timeout: 8000,
  params: { appid: env.OPENWEATHER_API_KEY, units: "metric" },
});

const AQI_LABELS = ["Good", "Fair", "Moderate", "Poor", "Very poor"] as const;
const round = (n: number, d = 0) => Number(n.toFixed(d));

async function request<T = any>(url: string, params: Record<string, unknown>): Promise<T> {
  try {
    const { data } = await http.get<T>(url, { params });
    return data;
  } catch (err) {
    const status = (err as AxiosError).response?.status;
    if (status === 401) throw new AppError(502, "Weather provider rejected the API key");
    if (status === 429) throw new AppError(503, "Weather provider rate limit reached");
    throw new AppError(502, "Weather provider is unavailable");
  }
}

type GeoHit = { name: string; country: string; lat: number; lon: number };

async function geocode(city: string): Promise<Location> {
  const results = await request<GeoHit[]>("/geo/1.0/direct", { q: city, limit: 1 });
  const hit = results[0];
  if (!hit) throw new AppError(404, `City "${city}" was not found`);
  return { name: hit.name, country: hit.country, lat: hit.lat, lon: hit.lon };
}

export async function searchCities(query: string): Promise<Location[]> {
  const results = await cached(
    `geo:${query.toLowerCase()}`,
    () => request<GeoHit[]>("/geo/1.0/direct", { q: query, limit: 5 }),
    3600,
  );
  return results.map(({ name, country, lat, lon }) => ({ name, country, lat, lon }));
}

const mapCurrent = (d: any): CurrentWeather => ({
  temp: round(d.main.temp, 1),
  feelsLike: round(d.main.feels_like, 1),
  humidity: d.main.humidity,
  windSpeed: round(d.wind.speed * 3.6, 1),
  visibility: round((d.visibility ?? 10000) / 1000, 1),
  pressure: d.main.pressure,
  description: d.weather[0].description,
  icon: d.weather[0].icon,
  rain1h: d.rain?.["1h"] ?? 0,
  sunrise: d.sys.sunrise,
  sunset: d.sys.sunset,
  timezoneOffset: d.timezone,
  updatedAt: d.dt,
});

function mapForecast(list: any[]): { hourly: HourlyPoint[]; daily: DailyPoint[] } {
  const hourly = list.slice(0, 8).map((i) => ({
    time: i.dt as number,
    temp: round(i.main.temp),
    pop: Math.round((i.pop ?? 0) * 100),
  }));

  const byDay = new Map<string, any[]>();
  for (const item of list) {
    const day = (item.dt_txt as string).slice(0, 10);
    byDay.set(day, [...(byDay.get(day) ?? []), item]);
  }

  const daily = [...byDay.entries()].map(([date, items]) => {
    const noon = items.find((i) => (i.dt_txt as string).includes("12:00")) ?? items[0];
    return {
      date,
      min: round(Math.min(...items.map((i) => i.main.temp_min))),
      max: round(Math.max(...items.map((i) => i.main.temp_max))),
      pop: Math.round(Math.max(...items.map((i) => i.pop ?? 0)) * 100),
      icon: noon.weather[0].icon as string,
    };
  });
  return { hourly, daily };
}

const mapAir = (d: any): AirQuality => {
  const aqi = d.list[0].main.aqi as AirQuality["aqi"];
  const c = d.list[0].components;
  return {
    aqi,
    label: AQI_LABELS[aqi - 1]!,
    components: {
      pm2_5: round(c.pm2_5, 1), pm10: round(c.pm10, 1), co: round(c.co),
      no2: round(c.no2, 1), o3: round(c.o3, 1), so2: round(c.so2, 1),
    },
  };
};

export async function getDashboard(city: string): Promise<WeatherDashboard> {
  return cached(`dashboard:${city.trim().toLowerCase()}`, async () => {
    const location = await geocode(city);
    const coords = { lat: location.lat, lon: location.lon };

    const [current, forecast, air] = await Promise.all([
      request("/data/2.5/weather", coords),
      request("/data/2.5/forecast", coords),
      request("/data/2.5/air_pollution", coords),
    ]);

    return {
      location,
      current: mapCurrent(current),
      ...mapForecast(forecast.list),
      airQuality: mapAir(air),
    };
  });
}
