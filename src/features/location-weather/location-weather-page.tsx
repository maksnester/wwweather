import { Link, useParams } from "react-router-dom";
import "./location-weather-page.css";
import { useWeatherByLocationQuery } from "../../weather-api";
import { getTimeString } from "./utils";

/**
 * Displays weather details for one selected location
 */
export const LocationWeatherPage = () => {
  const { location } = useParams();
  if (!location) {
    throw new Error(
      "LocationWeatherPage should only be used with /:location route"
    );
  }

  const { data, isLoading, error } = useWeatherByLocationQuery(location);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const errorMessage =
    (error instanceof Error && error.message) || "Something went wrong";

  const UNIT = "°C";

  return (
    <>
      <header className="location-header">
        <Link to="/" className="back-link">
          Back
        </Link>
        <h1 className="location-title">{location}</h1>
      </header>

      {error && <p>{errorMessage}</p>}

      {data && (
        <main>
          <p>
            {data.weather[0].main} ({data.weather[0].description})
          </p>
          <p>
            {data.main.temp.toFixed(0)} {UNIT}
          </p>
          <p>
            Min: {data.main.temp_min.toFixed(0)} {UNIT}
          </p>
          <p>
            Max: {data.main.temp_max.toFixed(0)} {UNIT}
          </p>
          <p>Sunrise: {getTimeString(data.sys.sunrise, data.timezone)}</p>
          <p>Sunset: {getTimeString(data.sys.sunset, data.timezone)}</p>
          <p>Humidity: {data.main.humidity} %</p>
          <p>Visibility: {data.visibility} m</p>
        </main>
      )}
    </>
  );
};
