import { WeatherList } from "../weather-list";
import { FormEvent, useState } from "react";
import { useLocationsList } from "./useLocationsList";

/**
 * Main page that displays all the locations that users added to track weather for
 */
export function DashboardPage() {
  const { locations, addLocation, removeLocation } = useLocationsList([
    "london",
    "berlin",
  ]);
  const [newLocation, setNewLocation] = useState("");

  const handleNewLocationSubmit = (e: FormEvent) => {
    e.preventDefault();
    addLocation(newLocation);
    setNewLocation("");
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
      <WeatherList
        locations={locations}
        onRemoveLocation={removeLocation}
      ></WeatherList>
    </div>
  );
}
