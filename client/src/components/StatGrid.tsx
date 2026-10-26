import type { CurrentWeather } from "../types/weather";

export function StatGrid({ current }: { current: CurrentWeather }) {
  const stats = [
    { label: "Humidity", value: `${current.humidity} %` },
    { label: "Wind speed", value: `${current.windSpeed} km/h` },
    { label: "Visibility", value: `${current.visibility} km` },
    { label: "Pressure", value: `${current.pressure} hPa` },
    { label: "Precipitation", value: `${current.rain1h} mm` },
  ];

  return (
    <dl className="grid grid-cols-2 gap-3">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-2xl border border-line bg-panel/80 p-4">
          <dt className="text-xs text-slate-400">{label}</dt>
          <dd className="mt-1 text-lg font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
