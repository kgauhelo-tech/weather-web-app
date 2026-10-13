import { useState, useEffect } from "react";
import { useLocation } from "../../data/LocationServices";
import Text from "../../Component/Text/Text";
import styles from "./Onboarding.module.css";

export function LocationOnboarding({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firstLocation, fetchFirstLocation } = useLocation();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!firstLocation) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [firstLocation]);

  const handleSaveMainLocation = async () => {
    if (!query) return;
    await fetchFirstLocation(query);
    setShowModal(false);
  };

  if (showModal) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <Text variant="heading">Welcome to Weather Dashboard</Text>
          <Text variant="p">
            Please set your main location to get started with your local
            forecast.
          </Text>

          <input
            type="text"
            placeholder="Enter your city (e.g., London, Paris)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSaveMainLocation} className={styles.button}>
            Save Main Location
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
