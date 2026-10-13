import { useRef } from "react";
import Text from "../../../Component/Text/Text";
import { useLocation } from "../../../data/LocationServices";
import styles from "./ChangeLocation.module.css";

const ChangeLocationsPage = () => {
  const {
    firstLocation,
    fetchFirstLocation,
    secondLocation,
    fetchSecondLocation,
    thirdLocation,
    fetchThirdLocation,
  } = useLocation();

  const firstLocationRef = useRef<HTMLInputElement>(null);
  const secondLocationRef = useRef<HTMLInputElement>(null);
  const thirdLocationRef = useRef<HTMLInputElement>(null);

  const handleFirstSearch = async () => {
    const query = firstLocationRef.current?.value ?? "";
    await fetchFirstLocation(query);
  };

  const handleSecondSearch = async () => {
    const query = secondLocationRef.current?.value ?? "";
    await fetchSecondLocation(query);
  };

  const handleThirdSearch = async () => {
    const query = thirdLocationRef.current?.value ?? "";
    await fetchThirdLocation(query);
  };

  const handleFirstClick = () => {
    console.log(firstLocation?.coordinates);
  };

  const handleSecondClick = () => {
    console.log(secondLocation?.coordinates);
  };

  const handleThirdClick = () => {
    console.log(thirdLocation?.coordinates);
  };

  return (
    <div className={`${styles.contentCont}`}>
      <div className={`${styles.mainLocation}`}>
        <Text variant="heading">Main Heading</Text>

        <Text variant="p">
          {firstLocation !== null
            ? `${firstLocation?.name}`
            : "Choose Location"}
        </Text>

        <div className={`${styles.firstLocation}`}>
          <input
            onChange={handleFirstSearch}
            ref={firstLocationRef}
            type="text"
            placeholder="Enter first location..."
          />

          {firstLocation && (
            <div onClick={handleFirstClick}>
              <Text variant="p">
                {firstLocation?.name}, {firstLocation?.country}
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className={`${styles.otherLocations}`}>
        <Text variant="subHeading">Other Locations</Text>
        <div className={`${styles.secondLocation}`}>
          <Text variant="p">
            <span className={styles.bolded}>
              {secondLocation !== null
                ? `${secondLocation?.name}`
                : "Choose Location"}
            </span>
          </Text>
          <input
            onChange={handleSecondSearch}
            ref={secondLocationRef}
            type="text"
            placeholder="Enter second location..."
          />

          {secondLocation && (
            <div onClick={handleSecondClick}>
              <Text variant="p">
                {secondLocation?.name}, {secondLocation?.country}
              </Text>
            </div>
          )}
        </div>

        <div className={`${styles.thirdLocation}`}>
          <Text variant="p">
            <span className={styles.bolded}>
              {thirdLocation !== null
                ? `${thirdLocation?.name}`
                : "Choose Location"}
            </span>
          </Text>
          <input
            onChange={handleThirdSearch}
            ref={thirdLocationRef}
            type="text"
            placeholder="Enter third location..."
          />

          {thirdLocation && (
            <div onClick={handleThirdClick}>
              <Text variant="p">
                {thirdLocation?.name}, {thirdLocation?.country}
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeLocationsPage;
