import React from "react";
import styles from "./Locations.module.css";
import Text from "../../Component/Text/Text";

const LocationsPage = () => {
  return (
    <div className={styles.mainCont}>
      <div className={styles.mainLocation}>
        <div className={styles.firstLine}>
          <Text variant="p">Main Location</Text>
          <button>Change</button>
        </div>

        <div className={styles.weatherCont}>
          <div className={styles.temp}>
            <Text variant="p">Temperature</Text>
            <Text variant="p">{""}</Text>
          </div>
          <div className={styles.rain}>
            <Text variant="p">Rain</Text>
            <Text variant="p">{""}</Text>
          </div>
          <div className={styles.wind}>
            <Text variant="p">wind</Text>
            <Text variant="p">{""}</Text>
          </div>
          <div className={styles.humidity}>
            <Text variant="p">Humidity</Text>
            <Text variant="p">{""}</Text>
          </div>
        </div>
      </div>
      <div className={styles.otherLocations}></div>
    </div>
  );
};

export default LocationsPage;
