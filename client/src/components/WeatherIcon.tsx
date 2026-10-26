import {
  Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Moon, Sun,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "01d": Sun, "01n": Moon,
  "02d": CloudSun, "02n": CloudMoon,
  "03": Cloud, "04": Cloud,
  "09": CloudDrizzle, "10": CloudRain,
  "11": CloudLightning, "13": CloudSnow, "50": CloudFog,
};

/** Maps an OpenWeather icon code (e.g. "10d") to a bundled icon: no external requests. */
export function WeatherIcon({ code, className = "size-10" }: { code: string; className?: string }) {
  const Icon = ICONS[code] ?? ICONS[code.slice(0, 2)] ?? Cloud;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
