import WeekForecast from "../../Component/WeekForecast";
import InputComponent from "../../Component/Text-input/Input";
import Text from "../../Component/Text/Text";
import styles from "./Dashboard.module.css";
import { CloudRain, Fog, Temperature, Wind } from "reicon-react";
import { useWeather } from "../../data/WeatherServices";
import { useLocation } from "../../data/LocationServices";

const Dashboard = () => {
  const { weatherResults, fetchWeatherForAllLocations } = useWeather();

  const { firstLocation, secondLocation, thirdLocation } = useLocation();

  const locations = [firstLocation, secondLocation, thirdLocation];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Multi-Location Weather Forecast</h1>

      {/* Trigger button to fetch weather for all 3 slots at once */}
      <button
        onClick={fetchWeatherForAllLocations}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Fetch Weather for All Locations
      </button>

      {/* Grid or list layout to display the 3 results */}
      <div style={{ display: "flex", gap: "20px" }}>
        {weatherResults.map((weather, index) => {
          const loc = locations[index];

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                minWidth: "250px",
              }}
            >
              <h3>
                Slot {index + 1}:{" "}
                {loc ? `${loc.name}, ${loc.country}` : "Not Selected"}
              </h3>

              {weather ? (
                <div>
                  <p>
                    <strong>Current Temp:</strong>{" "}
                    {weather.current.temperature_2m}°C
                  </p>
                  <p>
                    <strong>Rain:</strong> {weather.current.rain} mm
                  </p>
                  <p>
                    <strong>Wind Speed:</strong>{" "}
                    {weather.current.wind_speed_10m} km/h
                  </p>
                  <p>
                    <strong>Humidity:</strong>{" "}
                    {weather.current.relative_humidity_2m}%
                  </p>
                </div>
              ) : (
                <p style={{ color: "#666" }}>No weather data loaded yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className={styles["dash-container"]}>
      <div className={styles.middleColumn}>
        <InputComponent
          elementId="search"
          inputType="text"
          placeholder="Search a location"
        />

        <div className={styles.focused}>
          <div className={styles.textCont}>
            <Text variant="p">
              <span className={styles.blue}>Today</span>
            </Text>

            <Text variant="title">
              <span className={styles.bolded}>{"location name"}</span>
            </Text>

            <Text variant="p">
              Rain Possibility: <span className={styles.bolded}>{"%"}</span>
            </Text>

            <Text variant="heading">{"Temperature value"}</Text>
            <div className={styles.iconCont}></div>
          </div>
        </div>

        <div className={styles.current}>
          <Text variant="p">
            <span className={styles.blue}>TODAY'S FORECAST</span>
          </Text>
        </div>

        <div className={styles.conditions}>
          <div></div>
          <div>
            <Text variant="p">
              <span className={styles.blue}>ALL CONDITIONS</span>
            </Text>

            <div>
              <Temperature />
              <Text variant="p">Temperature</Text>
              <Text variant="p">{"temp"}</Text>
            </div>

            <div>
              <Fog />
              <Text variant="p">Humidity</Text>
              <Text variant="p">{"temp"}</Text>
            </div>

            <div>
              <CloudRain />
              <Text variant="p">Rain</Text>
              <Text variant="p">{"temp"}</Text>
            </div>

            <div>
              <Wind />
              <Text variant="p">Wind Speed</Text>
              <Text variant="p">{"temp"}</Text>
            </div>
          </div>
        </div>
      </div>

      <WeekForecast />
    </div>
  );
};

export default Dashboard;
