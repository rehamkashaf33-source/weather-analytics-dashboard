export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number; // km/h
  visibility: number; // km
  pressure: number; // hPa
  description: string;
  icon: string;
  rain1h: number; // mm
  sunrise: number; // unix seconds
  sunset: number;
  timezoneOffset: number; // seconds
  updatedAt: number;
}

export interface HourlyPoint {
  time: number;
  temp: number;
  pop: number; 
}

export interface DailyPoint {
  date: string; 
  min: number;
  max: number;
  pop: number;
  icon: string;
}

export interface AirQuality {
  aqi: 1 | 2 | 3 | 4 | 5;
  label: "Good" | "Fair" | "Moderate" | "Poor" | "Very poor";
  components: { pm2_5: number; pm10: number; co: number; no2: number; o3: number; so2: number };
}

export interface WeatherDashboard {
  location: Location;
  current: CurrentWeather;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  airQuality: AirQuality;
}
