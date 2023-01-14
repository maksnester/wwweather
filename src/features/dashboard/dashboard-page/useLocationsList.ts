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
      const newLocationLowercase = newLocation.toLowerCase();
      if (!locations.includes(newLocationLowercase)) {
        setLocations([newLocationLowercase].concat(locations));
      }
    },
    [locations]
  );

  const removeLocation = useCallback(
    (locationToRemove: string) => {
      const locationToRemoveLowercase = locationToRemove.toLowerCase();
      const foundLocationIndex = locations.findIndex(
        (location) => location === locationToRemoveLowercase
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
