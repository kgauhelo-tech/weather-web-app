import { createContext, useContext, useState, type ReactNode } from "react";
import { fetchWeatherApi } from "openmeteo";
import { useLocation } from "./LocationServices";

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

interface WeatherContextType {
  weatherResults: (WeatherData | null)[];
  fetchWeatherForAllLocations: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const { firstLocation, secondLocation, thirdLocation } = useLocation();

  const [weatherResults, setWeatherResults] = useState<(WeatherData | null)[]>([
    null,
    null,
    null,
  ]);

  const fetchWeatherForAllLocations = async () => {
    // Gather coordinates, fallback to 0 if location hasn't been searched yet
    const lats = [
      firstLocation?.coordinates[1] ?? 0,
      secondLocation?.coordinates[1] ?? 0,
      thirdLocation?.coordinates[1] ?? 0,
    ];

    const longs = [
      firstLocation?.coordinates[0] ?? 0,
      secondLocation?.coordinates[0] ?? 0,
      thirdLocation?.coordinates[0] ?? 0,
    ];

    const params = {
      latitude: lats,
      longitude: longs,
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "rain",
        "wind_speed_80m",
      ],
      current: [
        "temperature_2m",
        "rain",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      timezone: "auto",
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    try {
      const responses = await fetchWeatherApi(url, params);
      const parsedWeatherList: WeatherData[] = [];

      for (const response of responses) {
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

        parsedWeatherList.push(weatherData);
      }

      setWeatherResults(parsedWeatherList);
    } catch (error) {
      console.log("Error fetching weather:", error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ weatherResults, fetchWeatherForAllLocations }}
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
