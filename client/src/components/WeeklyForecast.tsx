import type { DailyPoint } from "../types/weather";
import { formatDay } from "../utils/format";
import { WeatherIcon } from "./WeatherIcon";
import { Panel } from "./Panel";

export function WeeklyForecast({ daily }: { daily: DailyPoint[] }) {
  return (
    <Panel title="Daily forecast">
      <ul className="grid grid-cols-3 gap-3">
        {daily.map((d) => (
          <li key={d.date} className="flex flex-col items-center rounded-2xl bg-ink/60 p-3 text-center">
            <span className="text-xs text-slate-400">{formatDay(d.date)}</span>
            <WeatherIcon code={d.icon} className="my-2 size-9 text-ember" />
            <span className="text-sm font-medium">{d.max}° <span className="text-slate-500">{d.min}°</span></span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
