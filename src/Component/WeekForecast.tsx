import styles from "./WeekForecast.module.css";
import Text from "./Text/Text";
import { Sun } from "reicon-react";
import { useWeather } from "../data/WeatherServices";

const WeekForecast = () => {
  const { firstWeather } = useWeather();

  const dailyForecast = firstWeather?.daily;

  return (
    <div className={styles.cont}>
      <Text variant="subHeading">7-Day Forecast</Text>

      <div className={styles.forecastCont}>
        {Array.from({ length: 7 }, (_, index) => {
          const date = dailyForecast?.time[index];

          const dayName = date
            ? date.toLocaleDateString("en-ZA", { weekday: "short" })
            : "";

          const maxTemp = dailyForecast?.temperature_2m_max?.[index];
          const minTemp = dailyForecast?.temperature_2m_min?.[index];

          return (
            <div key={`${dayName}-${index}`} className={styles.dayRow}>
              {/* Day Name */}
              <div className={styles.dayName}>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {index === 0 ? "Today" : dayName || "--"}
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
                  {maxTemp != null && minTemp != null ? (
                    <span className={styles.bolded}>
                      {Math.round(maxTemp)}° / {Math.round(minTemp)}°C
                    </span>
                  ) : (
                    "--° / --°"
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
