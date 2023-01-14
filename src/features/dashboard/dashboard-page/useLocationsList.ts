import { useCallback } from "react";
import { useLocalStorage } from "../../../hooks/useLocalstorage";

const STORAGE_KEY = "locations";

// persists state of entered locations in localstorage
export const useLocationsList = (defaultLocations: string[] = []) => {
  const [locations, setLocations] = useLocalStorage(
    STORAGE_KEY,
    defaultLocations
  );

  return {
    locations,
    addLocation: useCallback((newLocation: string) => {
      const newLocationLowercase = newLocation.toLowerCase();
      if (!locations.includes(newLocationLowercase)) {
        setLocations(locations.concat(newLocationLowercase));
      }
    }, locations),
  };
};
