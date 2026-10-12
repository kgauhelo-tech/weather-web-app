import styles from "./Locations.module.css";
import Text from "../../Component/Text/Text";
import { useLocation } from "../../data/LocationServices";
import { useRef } from "react";
import CustomButton from "../../Component/CustomButton/CustomButton";
import { useNavigate } from "react-router";
// import InputComponent from "../../Component/Text-input/Input";

const LocationsPage = () => {
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

  const navigate = useNavigate();

  const handleFirstSearch = async () => {
    const query = secondLocationRef.current?.value ?? "";
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

  const handleChangeClick = () => {
    navigate("/changeLocations");
  };

  return (
    <>
      <div className={styles.contentCont}>
        <div className={styles.mainLocation}>
          <div>
            <div className={styles.firstRow}>
              <Text variant="heading">Main Location</Text>
              <CustomButton
                content={"Change"}
                variant={"primary"}
                onClick={handleChangeClick}
              />
            </div>

            <Text variant="p">
              <span className={styles.darkened}>
                {firstLocation ? `${firstLocation?.name}` : "No Location Set"}
              </span>
            </Text>
          </div>

          <div className={styles.mainConditions}>
            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Temperature</span>
              </Text>
              <Text variant="subHeading">{"temp"}</Text>
            </div>

            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Rain</span>
              </Text>
              <Text variant="subHeading">{"temp"}</Text>
            </div>

            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Wind Spe</span>
                ed
              </Text>
              <Text variant="subHeading">{"temp"}</Text>
            </div>

            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Humidity</span>
              </Text>
              <Text variant="subHeading">{"temp"}</Text>
            </div>
          </div>
        </div>

        <div className={styles.otherLocations}>
          <Text variant="heading">Other Locations</Text>

          <div className={styles.loc1}>
            <Text variant="subHeading">
              {secondLocation ? `${secondLocation.name}` : "Location not set"}
            </Text>

            <div className={styles.conditions}>
              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Temperature</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Rain</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Wind Speed</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Humidity</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>
            </div>
          </div>
          <div className={styles.loc2}>
            <Text variant="subHeading">
              {thirdLocation ? `${thirdLocation.name}` : "Location not set"}
            </Text>

            <div className={styles.conditions}>
              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Temperature</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Rain</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Wind Speed</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Humidity</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>{"Temp"}</span>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`${styles.locationsCont}`}>
      <div className={`${styles.mainLocation}`}>
        <Text variant="subHeading">Main Heading</Text>

        <Text variant="p">
          {firstLocation !== null ? `${firstLocation?.name}` : "Set Location"}
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
        <div className={`${styles.secondLocation}`}>
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

export default LocationsPage;
