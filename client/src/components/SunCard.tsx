import type { CurrentWeather } from "../types/weather";
import { formatCityTime } from "../utils/format";
import { Panel } from "./Panel";

export function SunCard({ current }: { current: CurrentWeather }) {
  return (
    <Panel title="Sunrise and sunset">
      <dl className="space-y-4">
        <div><dt className="text-xs text-slate-400">Sunrise</dt><dd className="text-xl font-semibold">{formatCityTime(current.sunrise, current.timezoneOffset)}</dd></div>
        <div><dt className="text-xs text-slate-400">Sunset</dt><dd className="text-xl font-semibold">{formatCityTime(current.sunset, current.timezoneOffset)}</dd></div>
      </dl>
    </Panel>
  );
}
