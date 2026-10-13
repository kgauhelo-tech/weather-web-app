import { type WeatherData } from "./WeatherServices";

const CACHE_PREFIX = "weather_cache_";
const ONE_HOUR = 60 * 60 * 1000;

type CachedItem = {
  timestamp: number;
  data: WeatherData;
};

export const getCachedWeather = (locationName: string): WeatherData | null => {
  const cached = localStorage.getItem(
    CACHE_PREFIX + locationName.toLowerCase(),
  );
  if (!cached) return null;

  try {
    const parsed: CachedItem = JSON.parse(cached);
    const isExpired = Date.now() - parsed.timestamp > ONE_HOUR;

    if (isExpired) {
      localStorage.removeItem(CACHE_PREFIX + locationName.toLowerCase());
      return null;
    }

    parsed.data.current.time = new Date(parsed.data.current.time);
    return parsed.data;
  } catch {
    return null;
  }
};

export const setCachedWeather = (locationName: string, data: WeatherData) => {
  const cacheItem: CachedItem = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(
    CACHE_PREFIX + locationName.toLowerCase(),
    JSON.stringify(cacheItem),
  );
};
