import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { Clouds, Menu4, Pin2, Setting2, X } from "reicon-react";
import Text from "../Text/Text";
import { useRef, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const handleOnClick = () => {
    console.log(linksRef.current?.classList);
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };
  return (
    <nav>
      <div className={styles.cont}>
        <NavLink className={styles.links} to="/">
          <Clouds />
          <Text variant="p">Weather</Text>
        </NavLink>
        <NavLink className={styles.links} to="/locations">
          <Pin2 />
          <Text variant="p">Locations</Text>
        </NavLink>
        <NavLink className={styles.links} to="/settings">
          <Setting2 />
          <Text variant="p">Settings</Text>
        </NavLink>
      </div>
      <div className={styles["mobile-nav"]}>
        <Text variant="subHeading">Weather Web</Text>
        {isOpen ? (
          <div ref={menuRef}>
            <X onClick={handleOnClick} size={30} />
          </div>
        ) : (
          <div ref={menuRef}>
            <Menu4 onClick={handleOnClick} size={30} />
          </div>
        )}
      </div>
      <div
        ref={linksRef}
        className={`${isOpen ? styles.mobile_links_cont : styles.hidden}`}
      >
        <NavLink className={styles["mobile-link"]} to="/">
          <Clouds size={20} />
          <Text variant="p">Weather</Text>
        </NavLink>
        <NavLink className={styles["mobile-link"]} to="/locations">
          <Pin2 size={20} />
          <Text variant="p">Locations</Text>
        </NavLink>
        <NavLink className={styles["mobile-link"]} to="/settings">
          <Setting2 size={20} />
          <Text variant="p">Settings</Text>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
