import { WeatherList } from "./weather-list";

// gets saved user locations or gives default list
const useLocationsList = (): string[] => {
  return ["london", "berlin"];
};

/**
 * Main page that displays all the locations that users added to track weather for
 */
export function DashboardPage() {
  const locations = useLocationsList();

  return (
    <div>
      <pre>{JSON.stringify(locations)}</pre>
      <WeatherList locations={locations}></WeatherList>
    </div>
  );
}
