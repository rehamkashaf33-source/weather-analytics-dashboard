import type { AirQuality } from "../types/weather";
import { Panel } from "./Panel";

const COLORS = ["#22c55e", "#a3e635", "#facc15", "#fb923c", "#ef4444"];

export function AirQualityCard({ air }: { air: AirQuality }) {
  const { components: c } = air;
  const rows: Array<[string, number]> = [
    ["PM2.5", c.pm2_5], ["PM10", c.pm10], ["CO", c.co], ["NO₂", c.no2], ["O₃", c.o3], ["SO₂", c.so2],
  ];

  return (
    <Panel title="Air quality">
      <div className="flex flex-wrap items-center gap-6">
        <div
          className="flex size-28 flex-col items-center justify-center rounded-full border-4"
          style={{ borderColor: COLORS[air.aqi - 1] }}
          role="img"
          aria-label={`Air quality index ${air.aqi} of 5, ${air.label}`}
        >
          <span className="text-xs text-slate-400">{air.label}</span>
          <span className="text-3xl font-semibold">{air.aqi}</span>
        </div>
        <dl className="grid flex-1 grid-cols-3 gap-4 text-sm">
          {rows.map(([name, value]) => (
            <div key={name}>
              <dt className="text-xs text-slate-400">{name}</dt>
              <dd className="font-medium">{value} <span className="text-xs text-slate-500">µg/m³</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}
