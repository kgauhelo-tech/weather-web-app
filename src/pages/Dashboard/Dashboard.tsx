import React from "react";
import WeekForecast from "../../Component/WeekForecast";
import InputComponent from "../../Component/Text-input/Input";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles["dash-container"]}>
      <div className={styles.middleColumn}>
        <InputComponent
          elementId="search"
          inputType="text"
          placeholder="Search a location"
        />
      </div>

      <WeekForecast />
    </div>
  );
};

export default Dashboard;
