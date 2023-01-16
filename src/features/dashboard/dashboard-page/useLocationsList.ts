import { useCallback, useEffect } from "react";
import { useLocalStorage } from "../../../hooks/useLocalstorage";

const STORAGE_KEY = "locations";

// persists state of entered locations in localstorage
export const useLocationsList = (defaultLocations: string[] = []) => {
  const [locations, setLocations] = useLocalStorage(
    STORAGE_KEY,
    defaultLocations
  );

  useEffect(() => {
    if (locations && !locations.length) {
      setLocations(defaultLocations);
    }
  }, []);

  const addLocation = useCallback(
    (newLocation: string) => {
      const newLocationFormatted = formatLocation(newLocation);
      if (!locations.includes(newLocationFormatted)) {
        setLocations([newLocationFormatted].concat(locations));
      }
    },
    [locations]
  );

  const removeLocation = useCallback(
    (locationToRemove: string) => {
      const locationToRemoveFormatted = formatLocation(locationToRemove);
      const foundLocationIndex = locations.findIndex(
        (location) => location === locationToRemoveFormatted
      );
      if (foundLocationIndex > -1) {
        setLocations(
          locations
            .slice(0, foundLocationIndex)
            .concat(locations.slice(foundLocationIndex + 1))
        );
      }
    },
    [locations]
  );

  return {
    locations,
    addLocation,
    removeLocation,
  };
};

const formatLocation = (str: string) => {
  return str.toLowerCase().trim();
};
