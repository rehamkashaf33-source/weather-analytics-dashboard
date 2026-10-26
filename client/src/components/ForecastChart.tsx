import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HourlyPoint } from "../types/weather";
import { formatCityTime } from "../utils/format";
import { Panel } from "./Panel";

export function ForecastChart({ hourly, offset }: { hourly: HourlyPoint[]; offset: number }) {
  const data = hourly.map((h) => ({ label: formatCityTime(h.time, offset), temp: h.temp }));

  return (
    <Panel title="Next 24 hours" className="h-72">
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="temp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97834" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#f97834" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#262c38" vertical={false} />
          <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="°" domain={["dataMin - 2", "dataMax + 2"]} />
          <Tooltip contentStyle={{ background: "#161a22", border: "1px solid #262c38", borderRadius: 12 }} formatter={(v) => [`${v}°C`, "Temp"]} />
          <Area type="monotone" dataKey="temp" stroke="#f97834" strokeWidth={2} fill="url(#temp)" />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
  );
}
