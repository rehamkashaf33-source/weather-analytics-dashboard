import axios, { AxiosError } from "axios";
import type { Location, WeatherDashboard } from "../types/weather";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api" });

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string }>) =>
    Promise.reject(new Error(err.response?.data?.message ?? "Network error. Check your connection.")),
);

export const fetchDashboard = (city: string) =>
  api.get<WeatherDashboard>(`/weather/${encodeURIComponent(city)}`).then((r) => r.data);

export const searchCities = (q: string) =>
  api.get<Location[]>("/weather/search", { params: { q } }).then((r) => r.data);
