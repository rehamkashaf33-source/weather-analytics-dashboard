import { useState } from "react";
import { AirQualityCard } from "../components/AirQualityCard";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { ForecastChart } from "../components/ForecastChart";
import { Skeleton } from "../components/Panel";
import { RainChances } from "../components/RainChances";
import { SearchBar } from "../components/SearchBar";
import { StatGrid } from "../components/StatGrid";
import { SunCard } from "../components/SunCard";
import { WeeklyForecast } from "../components/WeeklyForecast";
import { useDashboard } from "../hooks/useWeather";

export default function Dashboard() {
  const [city, setCity] = useState("Cairo");
  const { data, isPending, error, refetch } = useDashboard(city);

  return (
    <main className="mx-auto max-w-7xl space-y-5 p-4 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Weather Dashboard</h1>
        <SearchBar onSelect={setCity} />
      </header>

      {error && (
        <div role="alert" className="flex items-center justify-between rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm">
          <span>{error.message}</span>
          <button onClick={() => refetch()} className="rounded-lg bg-red-500/20 px-3 py-1.5 hover:bg-red-500/30">Try again</button>
        </div>
      )}

      {isPending ? (
        <div className="grid gap-5 lg:grid-cols-3">
          <Skeleton className="h-72" /><Skeleton className="h-72 lg:col-span-2" />
          <Skeleton className="h-56 lg:col-span-2" /><Skeleton className="h-56" />
        </div>
      ) : data ? (
        <div className="grid gap-5 lg:grid-cols-3">
          <CurrentWeatherCard location={data.location} current={data.current} />
          <div className="lg:col-span-2"><ForecastChart hourly={data.hourly} offset={data.current.timezoneOffset} /></div>

          <StatGrid current={data.current} />
          <div className="lg:col-span-2"><AirQualityCard air={data.airQuality} /></div>

          <SunCard current={data.current} />
          <WeeklyForecast daily={data.daily} />
          <RainChances daily={data.daily} />
        </div>
      ) : null}
    </main>
  );
}
