import styles from "./WeekForecast.module.css";

import Text from "./Text/Text";
import { Sun } from "reicon-react";

const WeekForecast = () => {
  const forecastDaysList: string[] = [];
  let now = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(now);
    nextDate.setDate(now.getDate() + i);

    const dayName = nextDate.toLocaleDateString("en-ZA", { weekday: "short" });
    forecastDaysList.push(dayName);
  }

  // ("en-ZA", options);

  return (
    <div className={styles.cont}>
      <Text variant="subHeading">7-Day Forecast</Text>

      <div className={styles.forecastCont}>
        {/* // for the day */}
        <div>
          {forecastDaysList.map((day) => {
            return <Text variant={"p"}>{day}</Text>;
          })}
        </div>
        {/* //for the icon */}
        <div>{}</div>
        {/* for the temperatures */}
        <div>{}</div>
      </div>
    </div>
  );
};

export default WeekForecast;
