import { createContext, useContext, useState, type ReactNode } from "react";
import { getCachedLocation, setCachedLocation } from "./LocationCache";

type LocationData = {
  name: string;
  country: string;
  coordinates: number[];
};

type LocationContextType = {
  firstLocation: LocationData | null;
  secondLocation: LocationData | null;
  thirdLocation: LocationData | null;
  fetchFirstLocation: (query: string) => Promise<void>;
  fetchSecondLocation: (query: string) => Promise<void>;
  fetchThirdLocation: (query: string) => Promise<void>;
};

export const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

export function LocationProvider({ children }: { children: ReactNode }) {
  // Initialize state directly from our clean cache utility
  const [firstLocation, setFirstLocation] = useState<LocationData | null>(() =>
    getCachedLocation("first"),
  );
  const [secondLocation, setSecondLocation] = useState<LocationData | null>(
    () => getCachedLocation("second"),
  );
  const [thirdLocation, setThirdLocation] = useState<LocationData | null>(() =>
    getCachedLocation("third"),
  );

  const fetchFirstLocation = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${query}&limit=1`,
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const locationData: LocationData = {
          name: feature.properties.name,
          country: feature.properties.country,
          coordinates: feature.geometry.coordinates,
        };
        setFirstLocation(locationData);
        setCachedLocation("first", locationData);
      }
    } catch (error) {
      console.log("Error fetching first location:", error);
    }
  };

  const fetchSecondLocation = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${query}&limit=1`,
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const locationData: LocationData = {
          name: feature.properties.name,
          country: feature.properties.country,
          coordinates: feature.geometry.coordinates,
        };
        setSecondLocation(locationData);
        setCachedLocation("second", locationData);
      }
    } catch (error) {
      console.log("Error fetching second location:", error);
    }
  };

  const fetchThirdLocation = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://photon.komoot.io/api/?q=${query}&limit=1`,
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        const locationData: LocationData = {
          name: feature.properties.name,
          country: feature.properties.country,
          coordinates: feature.geometry.coordinates,
        };
        setThirdLocation(locationData);
        setCachedLocation("third", locationData);
      }
    } catch (error) {
      console.log("Error fetching third location:", error);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        firstLocation,
        secondLocation,
        thirdLocation,
        fetchFirstLocation,
        fetchSecondLocation,
        fetchThirdLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
