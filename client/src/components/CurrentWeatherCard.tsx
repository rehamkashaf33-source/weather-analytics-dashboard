import type { CurrentWeather, Location } from "../types/weather";
import { WeatherIcon } from "./WeatherIcon";

export function CurrentWeatherCard({ location, current }: { location: Location; current: CurrentWeather }) {
  const updated = new Date(current.updatedAt * 1000).toLocaleString("en-US", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
  });

  return (
    <section className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-orange-400 to-ember p-6 text-white">
      <div className="flex items-start justify-between text-sm font-medium">
        <span>{location.name}, {location.country}</span>
        <span className="opacity-80">Updated {updated}</span>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <WeatherIcon code={current.icon} className="size-24" />
        <div>
          <p className="text-6xl font-semibold tracking-tight">{Math.round(current.temp)}°C</p>
          <p className="mt-1 capitalize">{current.description}</p>
        </div>
      </div>
      <p className="mt-6 text-sm opacity-90">Feels like {Math.round(current.feelsLike)}°C</p>
    </section>
  );
}
