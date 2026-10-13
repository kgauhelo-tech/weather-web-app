import styles from "./WeekForecast.module.css";
import Text from "./Text/Text";
import { Sun } from "reicon-react";
import { useWeather } from "../data/WeatherServices";

const WeekForecast = () => {
  const { firstWeather } = useWeather();

  // 🔍 Debug: Let's see what hourly data looks like in your console
  console.log("WeekForecast - firstWeather.hourly:", firstWeather?.hourly);

  // Generate 7 day labels starting from today
  const forecastDaysList: string[] = [];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + i);
    const dayName = nextDate.toLocaleDateString("en-ZA", { weekday: "short" });
    forecastDaysList.push(dayName);
  }

  return (
    <div className={styles.cont}>
      <Text variant="subHeading">7-Day Forecast</Text>

      <div className={styles.forecastCont}>
        {forecastDaysList.map((day, index) => {
          // Let's pull the temperature for midday (index 12) of each day chunk
          const hourlyTemps = firstWeather?.hourly?.temperature_2m;
          const targetIndex = index * 24 + 12; // Midday temperature for that day
          const temp =
            hourlyTemps && hourlyTemps[targetIndex] !== undefined
              ? Math.round(hourlyTemps[targetIndex])
              : null;

          return (
            <div key={`${day}-${index}`} className={styles.dayRow}>
              {/* Day Name */}
              <div className={styles.dayName}>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {index === 0 ? "Today" : day}
                  </span>
                </Text>
              </div>

              {/* Weather Icon */}
              <div className={styles.iconCont}>
                <Sun size={20} />
              </div>

              {/* Temperatures */}
              <div className={styles.tempCont}>
                <Text variant="p">
                  {temp !== null ? (
                    <span className={styles.bolded}>{temp}°C</span>
                  ) : (
                    "--°"
                  )}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekForecast;
