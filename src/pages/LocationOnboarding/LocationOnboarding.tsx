import { useState, useEffect } from "react";
import { useLocation } from "../../data/LocationServices";
import Text from "../../Component/Text/Text";
import styles from "./Onboarding.module.css"; // Optional styling

export function LocationOnboarding({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firstLocation, fetchFirstLocation } = useLocation();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Check on mount if first location is stored/set
  useEffect(() => {
    // If firstLocation is null, trigger onboarding
    if (!firstLocation) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [firstLocation]);

  const handleSaveMainLocation = async () => {
    if (!query) return;
    await fetchFirstLocation(query);
    // Once fetched and saved to context/storage, close modal
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

  // If main location exists, render the rest of the app normally!
  return <>{children}</>;
}
