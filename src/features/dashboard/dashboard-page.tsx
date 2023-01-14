import { WeatherList } from "./weather-list";
import { FormEvent, useCallback, useState } from "react";

// gets saved user locations or gives default list
const useLocationsList = () => {
  const [locations, setLocations] = useState(["london", "berlin"]);

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

/**
 * Main page that displays all the locations that users added to track weather for
 */
export function DashboardPage() {
  const { locations, addLocation } = useLocationsList();
  const [newLocation, setNewLocation] = useState("");

  const handleNewLocationSubmit = (e: FormEvent) => {
    e.preventDefault();
    addLocation(newLocation);
  };

  return (
    <div>
      <form onSubmit={handleNewLocationSubmit}>
        <input
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Add new location"
        />
      </form>
      <WeatherList locations={locations}></WeatherList>
    </div>
  );
}
