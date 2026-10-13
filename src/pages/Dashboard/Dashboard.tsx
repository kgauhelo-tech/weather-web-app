import { useEffect, useRef } from "react";
import WeekForecast from "../../Component/WeekForecast";
import Text from "../../Component/Text/Text";
import styles from "./Dashboard.module.css";
import { CloudRain, Fog, Sun, Temperature, Wind } from "reicon-react";
import { useWeather } from "../../data/WeatherServices";
import { useLocation } from "../../data/LocationServices";

const Dashboard = () => {
  const { fetchFirstWeather, firstWeather } = useWeather();
  const { firstLocation, fetchFirstLocation } = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstLocation) {
      fetchFirstWeather();
    }
  }, [firstLocation, fetchFirstWeather]);

  const handleSearchKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      const query = inputRef.current?.value ?? "";
      if (query) {
        await fetchFirstLocation(query);
      }
    }
  };

  return (
    <div className={styles["dash-container"]}>
      <div className={styles.middleColumn}>
        <input
          ref={inputRef}
          id="search"
          type="text"
          placeholder="Search a location (Press Enter)"
          onKeyDown={handleSearchKeyDown}
        />

        {!firstLocation ? (
          <div className={`${styles.focused} ${styles.emptyState}`}>
            <div className={styles.textCont}>
              <div className={styles.titleCont}>
                <Text variant="heading">
                  <span className={styles.bolded}>No Main Location Set</span>
                </Text>
                <Text variant="p">
                  Search for a city using the input above to view your local
                  forecast.
                </Text>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.focused}>
            <div className={styles.textCont}>
              <div className={styles.titleCont}>
                <Text variant="p">
                  <span className={styles.blue}>Today</span>
                </Text>

                <Text variant="heading">
                  <span className={`${styles.bolded} ${styles.allCaps}`}>
                    {`${firstLocation.name}, ${firstLocation.country}`}
                  </span>
                </Text>

                <Text variant="p">
                  Rain Possibility:{" "}
                  <span className={styles.bolded}>
                    {firstWeather?.current
                      ? `${Math.round(firstWeather.current.rain)} mm`
                      : "0 mm"}
                  </span>
                </Text>
              </div>

              <Text variant="title">
                {firstWeather?.current
                  ? `${Math.round(firstWeather.current.temperature_2m)}°C`
                  : "--°C"}
              </Text>
              <div className={styles.iconCont}></div>
            </div>
            <div className={styles.iconCont}>{<Sun size={120} />}</div>
          </div>
        )}

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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
                    : "--"}
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
