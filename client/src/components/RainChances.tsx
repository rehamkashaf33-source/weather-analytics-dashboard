import type { DailyPoint } from "../types/weather";
import { formatDay } from "../utils/format";
import { Panel } from "./Panel";

export function RainChances({ daily }: { daily: DailyPoint[] }) {
  return (
    <Panel title="Chance of rain">
      <ul className="space-y-2.5">
        {daily.map((d) => (
          <li key={d.date} className="flex items-center gap-3 text-xs">
            <span className="w-8 text-slate-400">{formatDay(d.date)}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={d.pop} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-ember" style={{ width: `${d.pop}%` }} />
            </div>
            <span className="w-8 text-right">{d.pop}%</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
