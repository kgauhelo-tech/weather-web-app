import WeekForecast from "../../Component/WeekForecast";
import InputComponent from "../../Component/Text-input/Input";
import Text from "../../Component/Text/Text";
import styles from "./Dashboard.module.css";
import { CloudRain, Fog, Temperature, Wind } from "reicon-react";

const Dashboard = () => {
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
