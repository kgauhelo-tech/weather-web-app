import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { Clouds, Pin2, Setting2 } from "reicon-react";
import Text from "../Text/Text";
const Navbar = () => {
  return (
    <nav>
      <div className={styles.cont}>
        <NavLink className={styles.links} to={""}>
          <Clouds />
          <Text variant="p">Weather</Text>
        </NavLink>
        <NavLink className={styles.links} to={""}>
          <Pin2 />
          <Text variant="p">Locations</Text>
        </NavLink>
        <NavLink className={styles.links} to={""}>
          <Setting2 />
          <Text variant="p">Settings</Text>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
