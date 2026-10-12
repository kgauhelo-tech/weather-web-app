import styles from "./Locations.module.css";
import Text from "../../Component/Text/Text";
import { useLocation } from "../../data/LocationServices";
import { useRef } from "react";
import { Handshake } from "reicon-react";
// import InputComponent from "../../Component/Text-input/Input";

const LocationsPage = () => {
  const { firstLocation, fetchFirstLocation } = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    const query = inputRef.current?.value ?? "";
    await fetchFirstLocation(query);
  };

  const handleClick = () => {
    console.log(firstLocation?.coordinates);
  };

  // return for practicing the thingy
  return (
    <div>
      <input
        onChange={handleSearch}
        ref={inputRef}
        type="text"
        placeholder="Enter first location..."
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      {firstLocation && (
        <p onClick={handleClick}>
          Found: {firstLocation.name}, {firstLocation.country}
        </p>
      )}
    </div>
  );
  // This is the actual return value
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
