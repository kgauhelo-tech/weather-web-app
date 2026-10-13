type LocationData = {
  name: string;
  country: string;
  coordinates: number[];
};

const CACHE_PREFIX = "location_cache_";

export const getCachedLocation = (slotKey: string): LocationData | null => {
  const cached = localStorage.getItem(CACHE_PREFIX + slotKey);
  if (!cached) return null;

  try {
    return JSON.parse(cached);
  } catch {
    return null;
  }
};

export const setCachedLocation = (slotKey: string, data: LocationData) => {
  localStorage.setItem(CACHE_PREFIX + slotKey, JSON.stringify(data));
};
