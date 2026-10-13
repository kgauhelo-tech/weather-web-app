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
        <div className={styles.notifications}>
          <Text variant="p">Allow Notifications</Text>

          <div className={styles.switch}>
            <RecordCircle3 />
          </div>
        </div>

        <div className={styles.location}>
          <Text variant="p">Allow Location Access</Text>

          <div className={styles.switch}>
            <RecordCircle3 />
          </div>
        </div>
      </div>

      <div className={styles.units_cont}>
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
        <Text variant="heading">Theme</Text>

        <div className={styles.toggleCont}>
          <Text variant="p">Activate {themeMode} mode</Text>

          <button
            type="button"
            className={styles.switch}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={themeMode === "dark"}
          >
            <RecordCircle3 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
