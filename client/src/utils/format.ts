/** Formats a unix time in the city's own timezone. */
export const formatCityTime = (unix: number, offsetSeconds: number) =>
  new Date((unix + offsetSeconds) * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "UTC",
  });

export const formatDay = (isoDate: string) =>
  new Date(`${isoDate}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" });
