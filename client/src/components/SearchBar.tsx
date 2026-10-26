import { useState } from "react";
import { useCitySearch } from "../hooks/useWeather";
import { useDebounce } from "../hooks/useDebounce";

export function SearchBar({ onSelect }: { onSelect: (city: string) => void }) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const { data = [] } = useCitySearch(useDebounce(value));

  const choose = (name: string) => {
    onSelect(name);
    setValue("");
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        value={value}
        onChange={(e) => { setValue(e.target.value); setOpen(true); }}
        onKeyDown={(e) => e.key === "Enter" && value.trim() && choose(value.trim())}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="Search for a city"
        aria-label="Search for a city"
        className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ember"
      />
      {open && data.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-xl">
          {data.map((c) => (
            <li key={`${c.lat},${c.lon}`}>
              <button
                type="button"
                onMouseDown={() => choose(c.name)}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-line focus-visible:bg-line focus-visible:outline-none"
              >
                {c.name}, {c.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
