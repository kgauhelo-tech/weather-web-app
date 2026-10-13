import { createContext, useContext, useState, type ReactNode } from "react";
import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "./LocationServices";

// 1. Define the full weather data structure (Current + Hourly Forecast)
export type WeatherData = {
  current: {
    time: Date;
    temperature_2m: number;
    rain: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: Float32Array | null;
    relative_humidity_2m: Float32Array | null;
    rain: Float32Array | null;
    wind_speed_80m: Float32Array | null;
  };
};

// 2. Define the Context contract for all 3 slots
type WeatherContextType = {
  firstWeather: WeatherData | null;
  secondWeather: WeatherData | null;
  thirdWeather: WeatherData | null;
  fetchFirstWeather: () => Promise<void>;
  fetchSecondWeather: () => Promise<void>;
  fetchThirdWeather: () => Promise<void>;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// --- LocalStorage Caching Helpers ---
const CACHE_PREFIX = "weather_cache_";
const ONE_HOUR = 60 * 60 * 1000; // 1 hour expiration

type CachedItem = {
  timestamp: number;
  data: WeatherData;
};

const getCachedWeather = (locationName: string): WeatherData | null => {
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

    // Restore date objects from stored strings
    parsed.data.current.time = new Date(parsed.data.current.time);
    parsed.data.hourly.time = parsed.data.hourly.time.map((t) => new Date(t));
    return parsed.data;
  } catch {
    return null;
  }
};

const setCachedWeather = (locationName: string, data: WeatherData) => {
  const cacheItem: CachedItem = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(
    CACHE_PREFIX + locationName.toLowerCase(),
    JSON.stringify(cacheItem),
  );
};

export function WeatherProvider({ children }: { children: ReactNode }) {
  // Pull in your locations from your Location Context
  const { firstLocation, secondLocation, thirdLocation } = useLocation();

  // State for each independent weather slot
  const [firstWeather, setFirstWeather] = useState<WeatherData | null>(null);
  const [secondWeather, setSecondWeather] = useState<WeatherData | null>(null);
  const [thirdWeather, setThirdWeather] = useState<WeatherData | null>(null);

  const url = "https://api.open-meteo.com/v1/forecast";

  const fetchFirstWeather = async () => {
    if (!firstLocation) return;

    const cached = getCachedWeather(firstLocation.name);
    if (cached) {
      setFirstWeather(cached);
      return;
    }

    const params = {
      latitude: [firstLocation.coordinates[1]],
      longitude: [firstLocation.coordinates[0]],
      current: [
        "temperature_2m",
        "rain",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "rain",
        "wind_speed_80m",
      ],
      timezone: "auto",
    };

    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;

      const weatherData: WeatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          rain: current.variables(1)!.value(),
          wind_speed_10m: current.variables(2)!.value(),
          relative_humidity_2m: current.variables(3)!.value(),
        },
        hourly: {
          time: Array.from(
            {
              length:
                (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval(),
            },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000,
              ),
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          relative_humidity_2m: hourly.variables(1)!.valuesArray(),
          rain: hourly.variables(2)!.valuesArray(),
          wind_speed_80m: hourly.variables(3)!.valuesArray(),
        },
      };

      setCachedWeather(firstLocation.name, weatherData);
      setFirstWeather(weatherData);
    } catch (error) {
      console.log("Error fetching first weather:", error);
    }
  };

  const fetchSecondWeather = async () => {
    if (!secondLocation) return;

    // 1. Check cache first
    const cached = getCachedWeather(secondLocation.name);
    if (cached) {
      setSecondWeather(cached);
      return;
    }

    const params = {
      latitude: [secondLocation.coordinates[1]],
      longitude: [secondLocation.coordinates[0]],
      current: [
        "temperature_2m",
        "rain",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "rain",
        "wind_speed_80m",
      ],
      timezone: "auto",
    };

    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;

      const weatherData: WeatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          rain: current.variables(1)!.value(),
          wind_speed_10m: current.variables(2)!.value(),
          relative_humidity_2m: current.variables(3)!.value(),
        },
        hourly: {
          time: Array.from(
            {
              length:
                (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval(),
            },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000,
              ),
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          relative_humidity_2m: hourly.variables(1)!.valuesArray(),
          rain: hourly.variables(2)!.valuesArray(),
          wind_speed_80m: hourly.variables(3)!.valuesArray(),
        },
      };

      setCachedWeather(secondLocation.name, weatherData);
      setSecondWeather(weatherData);
    } catch (error) {
      console.log("Error fetching second weather:", error);
    }
  };

  const fetchThirdWeather = async () => {
    if (!thirdLocation) return;

    // 1. Check cache first
    const cached = getCachedWeather(thirdLocation.name);
    if (cached) {
      setThirdWeather(cached);
      return;
    }

    const params = {
      latitude: [thirdLocation.coordinates[1]],
      longitude: [thirdLocation.coordinates[0]],
      current: [
        "temperature_2m",
        "rain",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "rain",
        "wind_speed_80m",
      ],
      timezone: "auto",
    };

    try {
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;

      const weatherData: WeatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          rain: current.variables(1)!.value(),
          wind_speed_10m: current.variables(2)!.value(),
          relative_humidity_2m: current.variables(3)!.value(),
        },
        hourly: {
          time: Array.from(
            {
              length:
                (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval(),
            },
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000,
              ),
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
          relative_humidity_2m: hourly.variables(1)!.valuesArray(),
          rain: hourly.variables(2)!.valuesArray(),
          wind_speed_80m: hourly.variables(3)!.valuesArray(),
        },
      };

      setCachedWeather(thirdLocation.name, weatherData);
      setThirdWeather(weatherData);
    } catch (error) {
      console.log("Error fetching third weather:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        firstWeather,
        secondWeather,
        thirdWeather,
        fetchFirstWeather,
        fetchSecondWeather,
        fetchThirdWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
