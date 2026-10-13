import styles from "./Locations.module.css";
import Text from "../../Component/Text/Text";
import { useLocation } from "../../data/LocationServices";
import CustomButton from "../../Component/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import { useWeather } from "../../data/WeatherServices";

const LocationsPage = () => {
  const { firstLocation, secondLocation, thirdLocation } = useLocation();

  const { firstWeather, secondWeather, thirdWeather } = useWeather();

  const navigate = useNavigate();

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
              <Text variant="subHeading">
                {firstWeather?.current
                  ? `${Math.round(firstWeather.current.temperature_2m)}`
                  : "0"}
                °C
              </Text>
            </div>

            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Rain</span>
              </Text>
              <Text variant="subHeading">
                {firstWeather?.current
                  ? `${Math.round(firstWeather.current.rain)}`
                  : "0"}
                mm
              </Text>
            </div>

            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Wind Speed</span>
              </Text>
              <Text variant="subHeading">
                {firstWeather?.current
                  ? `${Math.round(firstWeather.current.wind_speed_10m)}`
                  : "0"}{" "}
                km/h
              </Text>
            </div>

            <div>
              <Text variant="subHeading">
                <span className={styles.darkened}>Humidity</span>
              </Text>
              <Text variant="subHeading">
                {firstWeather?.current
                  ? `${Math.round(firstWeather.current.relative_humidity_2m)}`
                  : "0"}
                %
              </Text>
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
                  <span className={styles.bolded}>
                    {secondWeather?.current
                      ? `${Math.round(secondWeather.current.temperature_2m)}`
                      : "0"}
                    °C
                  </span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Rain</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {secondWeather?.current
                      ? `${Math.round(secondWeather.current.rain)}`
                      : "0"}
                    %
                  </span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Wind Speed</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {secondWeather?.current
                      ? `${Math.round(secondWeather.current.wind_speed_10m)}`
                      : "0"}{" "}
                    km/h
                  </span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Humidity</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {secondWeather?.current
                      ? `${Math.round(secondWeather.current.relative_humidity_2m)}`
                      : "0"}
                    %
                  </span>
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
                  <span className={styles.bolded}>
                    {thirdWeather?.current
                      ? `${Math.round(thirdWeather.current.temperature_2m)}`
                      : "0"}
                    °C
                  </span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Rain</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {thirdWeather?.current
                      ? `${Math.round(thirdWeather.current.temperature_2m)}`
                      : "0"}
                    %
                  </span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Wind Speed</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {thirdWeather?.current
                      ? `${Math.round(thirdWeather.current.wind_speed_10m)}`
                      : "0"}{" "}
                    km/h
                  </span>
                </Text>
              </div>

              <div className={styles.condition}>
                <Text variant="p">
                  <span className={styles.darkened}>Humidity</span>
                </Text>
                <Text variant="p">
                  <span className={styles.bolded}>
                    {thirdWeather?.current
                      ? `${Math.round(thirdWeather.current.relative_humidity_2m)}`
                      : "0"}
                    %
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationsPage;
