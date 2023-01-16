import { WeatherList } from "../weather-list";
import { FormEvent, useState } from "react";
import { useLocationsList } from "./useLocationsList";
import { usePageTitle } from "../../../hooks/usePageTitle";

import "./dashboard-page.css";

/**
 * Main page that displays all the locations that users added to track weather for
 */
export function DashboardPage() {
  usePageTitle("Weather app");

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
    <div className="dashboard-page">
      <form onSubmit={handleNewLocationSubmit}>
        <input
          className="dashboard-page__location-input"
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
