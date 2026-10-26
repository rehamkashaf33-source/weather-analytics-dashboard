import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchDashboard, searchCities } from "../services/api";

export const useDashboard = (city: string) =>
  useQuery({
    queryKey: ["dashboard", city.toLowerCase()],
    queryFn: () => fetchDashboard(city),
    staleTime: 5 * 60_000,
    retry: 1,
    placeholderData: keepPreviousData,
  });

export const useCitySearch = (q: string) =>
  useQuery({
    queryKey: ["cities", q.toLowerCase()],
    queryFn: () => searchCities(q),
    enabled: q.trim().length >= 2,
    staleTime: 60 * 60_000,
  });
