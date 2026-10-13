import WeekForecast from "../../Component/WeekForecast";
import InputComponent from "../../Component/Text-input/Input";
import Text from "../../Component/Text/Text";
import styles from "./Dashboard.module.css";
import { CloudRain, Fog, Sun, Sun2, Temperature, Wind } from "reicon-react";
// import { useWeather } from "../../data/WeatherServices";
// import { useLocation } from "../../data/LocationServices";

const Dashboard = () => {
  // const { weatherResults, fetchWeatherForAllLocations } = useWeather();

  // const { firstLocation, secondLocation, thirdLocation } = useLocation();

  // const locations = [firstLocation, secondLocation, thirdLocation];

  // return (
  //   <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
  //     <h1>Multi-Location Weather Forecast</h1>

  //     {/* Trigger button to fetch weather for all 3 slots at once */}
  //     <button
  //       onClick={fetchWeatherForAllLocations}
  //       style={{
  //         padding: "10px 20px",
  //         fontSize: "16px",
  //         cursor: "pointer",
  //         marginBottom: "20px",
  //       }}
  //     >
  //       Fetch Weather for All Locations
  //     </button>

  //     {/* Grid or list layout to display the 3 results */}
  //     <div style={{ display: "flex", gap: "20px" }}>
  //       {weatherResults.map((weather, index) => {
  //         const loc = locations[index];

  //         return (
  //           <div
  //             key={index}
  //             style={{
  //               border: "1px solid #ccc",
  //               padding: "15px",
  //               borderRadius: "8px",
  //               minWidth: "250px",
  //             }}
  //           >
  //             <h3>
  //               Slot {index + 1}:{" "}
  //               {loc ? `${loc.name}, ${loc.country}` : "Not Selected"}
  //             </h3>

  //             {weather ? (
  //               <div>
  //                 <p>
  //                   <strong>Current Temp:</strong>{" "}
  //                   {weather.current.temperature_2m}°C
  //                 </p>
  //                 <p>
  //                   <strong>Rain:</strong> {weather.current.rain} mm
  //                 </p>
  //                 <p>
  //                   <strong>Wind Speed:</strong>{" "}
  //                   {weather.current.wind_speed_10m} km/h
  //                 </p>
  //                 <p>
  //                   <strong>Humidity:</strong>{" "}
  //                   {weather.current.relative_humidity_2m}%
  //                 </p>
  //               </div>
  //             ) : (
  //               <p style={{ color: "#666" }}>No weather data loaded yet.</p>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

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
                  {"location name"}
                </span>
              </Text>

              <Text variant="p">
                Rain Possibility: <span className={styles.bolded}>{"%"}</span>
              </Text>
            </div>

            <Text variant="title">{"Temperature value"}</Text>
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
                <Text variant="p">time</Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>9 AM</span>
                </Text>
                <Sun />
                <Text variant="p">time</Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>12 PM</span>
                </Text>
                <Sun />
                <Text variant="p">time</Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>3 PM</span>
                </Text>
                <Sun />
                <Text variant="p">time</Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>6 PM</span>
                </Text>
                <Sun />
                <Text variant="p">time</Text>
              </div>

              <div className={styles.time}>
                <Text variant="p">
                  <span className={styles.bolded}>9 PM</span>
                </Text>
                <Sun />
                <Text variant="p">time</Text>
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
                <Text variant="p">{"temp"}</Text>
              </div>

              <div className={styles.condition}>
                <Fog />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Humidity</span>
                </Text>
                <Text variant="p">{"temp"}</Text>
              </div>

              <div className={styles.condition}>
                <CloudRain />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Rain</span>
                </Text>
                <Text variant="p">{"temp"}</Text>
              </div>

              <div className={styles.condition}>
                <Wind />
                <Text variant="p">
                  <span className={styles.conditionLabel}>Wind Speed</span>
                </Text>
                <Text variant="p">{"temp"}</Text>
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
