import { useState } from "react";
import styles from "./SettingsPage.module.css";
import Text from "../../Component/Text/Text";
import { RecordCircle3 } from "reicon-react";

const SettingsPage = () => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.permissions_cont}>
        <Text variant="subHeading">
          <span className={styles.bolded}>Permissions</span>
        </Text>
        <div className={styles.perm}>
          <Text variant="p">Allow Notifications</Text>

          <div className={styles.switch}>
            <RecordCircle3 />
          </div>
        </div>

        <div className={styles.perm}>
          <Text variant="p">Allow Location Access</Text>

          <div className={styles.switch}>
            <RecordCircle3 />
          </div>
        </div>
      </div>

      <div className={styles.units_cont}>
        <Text variant="subHeading">
          <span className={styles.bolded}>Display Units</span>
        </Text>
        <div className={styles.temperature}>
          <Text variant="p">Temperature Units</Text>

          <select name="temperature" id="temperature">
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>

        <div className={styles.speed}>
          <Text variant="p">Wind Speed Units</Text>

          <select name="speed" id="speed">
            <option value="km/h">km/h</option>
            <option value="mph">mph</option>
          </select>
        </div>
      </div>

      <div className={styles.theme_cont}>
        <Text variant="subHeading">
          <span className={styles.bolded}>Theme</span>
        </Text>

        <div className={styles.toggleCont}>
          <Text variant="p">Activate {themeMode} mode</Text>

          <div className={styles.switch} onClick={toggleTheme}>
            <RecordCircle3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
