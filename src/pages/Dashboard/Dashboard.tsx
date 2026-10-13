import WeekForecast from "../../Component/WeekForecast";
import Text from "../../Component/Text/Text";
import styles from "./Dashboard.module.css";
import { CloudRain, Fog, Sun, Temperature, Wind } from "reicon-react";
import { useWeather } from "../../data/WeatherServices";
import { useLocation } from "../../data/LocationServices";
import { useEffect } from "react";

const Dashboard = () => {
  const { fetchFirstWeather, firstWeather } = useWeather();

  const { firstLocation } = useLocation();

  const location = [firstLocation];

  useEffect(() => {
    if (firstLocation) {
      fetchFirstWeather();
    }
  }, [firstLocation, fetchFirstWeather]);

  // const handleSearch = async () => {
  //   const query = inputRef.current?.value ?? "";
  //   if (query) {
  //     await firstLocation(query);
  //   }
  // };

  return (
    <div className={styles["dash-container"]}>
      <div className={styles.middleColumn}>
        <input id="search" type="text" placeholder="Search a location" />

        <div className={styles.focused}>
          <div className={styles.textCont}>
            <div className={styles.titleCont}>
              <Text variant="p">
                <span className={styles.blue}>Today</span>
              </Text>

              <Text variant="heading">
                <span className={`${styles.bolded} ${styles.allCaps}`}>
                  {firstLocation
                    ? `${firstLocation.name}, ${firstLocation.country}`
                    : "No Location Set"}
                </span>
              </Text>

              <Text variant="p">
                Rain Possibility:{" "}
                <span className={styles.bolded}>
                  {firstWeather?.current
                    ? `${Math.round(firstWeather.current.rain)}%`
                    : "0%"}
                </span>
              </Text>
            </div>

            <Text variant="title">
              {firstWeather?.current
                ? `${Math.round(firstWeather.current.temperature_2m)}°C`
                : "0°C"}
            </Text>
            <div className={styles.iconCont}></div>
          </div>
          <div className={styles.iconCont}>{<Sun size={120} />}</div>
        </div>

        <div className={styles.boxed}>
          <div className={styles.forecast}>
            <Text variant="p">
              <span className={`${styles.blue} ${styles.bolded}`}>
                TODAY'S FORECAST
              </span>
            </Text>

            <div className={styles.times}>
              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>6 AM</span>
                </Text>
                <Sun />
                <Text variant="p">
                  {firstWeather?.hourly.temperature_2m
                    ? `${Math.round(firstWeather.hourly.temperature_2m[6])}°C`
                    : "0°C"}
                </Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>9 AM</span>
                </Text>
                <Sun />
                <Text variant="p">
                  {firstWeather?.hourly.temperature_2m
                    ? `${Math.round(firstWeather.hourly.temperature_2m[9])}°C`
                    : "0°C"}
                </Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>12 PM</span>
                </Text>
                <Sun />
                <Text variant="p">
                  {firstWeather?.hourly.temperature_2m
                    ? `${Math.round(firstWeather.hourly.temperature_2m[12])}°C`
                    : "0°C"}
                </Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>3 PM</span>
                </Text>
                <Sun />
                <Text variant="p">
                  {firstWeather?.hourly.temperature_2m
                    ? `${Math.round(firstWeather.hourly.temperature_2m[15])}°C`
                    : "0°C"}
                </Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>6 PM</span>
                </Text>
                <Sun />
                <Text variant="p">
                  {firstWeather?.hourly.temperature_2m
                    ? `${Math.round(firstWeather.hourly.temperature_2m[18])}°C`
                    : "0°C"}
                </Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>9 PM</span>
                </Text>
                <Sun />
                <Text variant="p">
                  {firstWeather?.hourly.temperature_2m
                    ? `${Math.round(firstWeather.hourly.temperature_2m[21])}°C`
                    : "0°C"}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.conditionsCont}>
            <Text variant="p">
              <span className={`${styles.blue} ${styles.bolded}`}>
                ALL CONDITIONS
              </span>
            </Text>

            <div className={styles.conditions}>
              <div className={styles.condition}>
                <Temperature />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Temperature</span>
                </Text>
                <Text variant="p">
                  {firstWeather?.current
                    ? `${Math.round(firstWeather.current.temperature_2m)}°C`
                    : "0°C"}
                </Text>
              </div>

              <div className={styles.condition}>
                <Fog />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Humidity</span>
                </Text>
                <Text variant="p">
                  {firstWeather?.current
                    ? `${Math.round(firstWeather.current.relative_humidity_2m)}%`
                    : "0%"}
                </Text>
              </div>

              <div className={styles.condition}>
                <CloudRain />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Rain</span>
                </Text>
                <Text variant="p">
                  {firstWeather?.current
                    ? `${Math.round(firstWeather.current.rain)} mm`
                    : "0 mm"}
                </Text>
              </div>

              <div className={styles.condition}>
                <Wind />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Wind Speed</span>
                </Text>
                <Text variant="p">
                  {firstWeather?.current
                    ? `${Math.round(firstWeather.current.wind_speed_10m)} km/h`
                    : "0 km/h"}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <WeekForecast />
      </div>
    </div>
  );
};

export default Dashboard;
