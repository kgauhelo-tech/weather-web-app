import { fetchWeatherApi } from "openmeteo";
import { createContext } from "react";
import { LocationContext, useLocation } from "./LocationServices";

const params = {
  latitude: [0, 0, 0],
  longitude: [0, 0, 0],
  hourly: ["temperature_2m", "relative_humidity_2m", "rain", "wind_speed_80m"],
  current: ["temperature_2m", "rain", "wind_speed_10m", "relative_humidity_2m"],
  timezone: "auto",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process 3 locations
for (const response of responses) {
  // Attributes for timezone and location
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const current = response.current()!;
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
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
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      rain: hourly.variables(2)!.valuesArray(),
      wind_speed_80m: hourly.variables(3)!.valuesArray(),
    },
  };

  // The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
  console.log(
    `\nCurrent time: ${weatherData.current.time}\n`,
    `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
    `\nCurrent rain: ${weatherData.current.rain}`,
    `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
    `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
  );
  console.log("\nHourly data:\n", weatherData.hourly);
}

type Weather = {};

interface WeatherContextType {
  fetchFirstLocationWeather: () => void;
  fetchSecondLocationWeather: () => void;
  fetchThirdLocationWeather: () => void;
  setFirstLocationWeather: () => void;
  setSecondLocation: () => void;
  setThirdLocation: () => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

interface WeatherProviderProps {
  children: React.ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const { firstLocation, secondLocation, thirdLocation } = useLocation();

  const firstLocationCoordinates = {
    lat: firstLocation?.coordinates[1],
    long: firstLocation?.coordinates[0],
  };

  const secondLocationCoordinates = {
    lat: secondLocation?.coordinates[1],
    long: secondLocation?.coordinates[0],
  };

  const thirdLocationCoordinates = {
    lat: thirdLocation?.coordinates[1],
    long: thirdLocation?.coordinates[0],
  };
};
