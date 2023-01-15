import { Link, useParams } from "react-router-dom";
import "./location-weather-page.css";
import { useWeatherByLocationQuery } from "../../weather-api";
import { getTimeString } from "./utils";
import { getMessageFromError } from "../../utils/getMessageFromError";

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

  const UNIT = "°C";

  return (
    <>
      <header className="location-header">
        <Link to="/" className="back-link">
          Back
        </Link>
        <h1 className="location-title">{location}</h1>
      </header>

      {error && <p>{getMessageFromError(error)}</p>}

      {data && (
        <main>
          <p>
            <span data-testid="weather-type">{data.weather[0].main}</span> (
            {data.weather[0].description})
          </p>
          <p>
            <span data-testid="temperature">{data.main.temp.toFixed(0)}</span>{" "}
            {UNIT}
          </p>
          <p>
            Min: {data.main.temp_min.toFixed(0)} {UNIT}
          </p>
          <p>
            Max: {data.main.temp_max.toFixed(0)} {UNIT}
          </p>
          <p>
            Sunrise:{" "}
            <span data-testid="sunrise-time">
              {getTimeString(data.sys.sunrise, data.timezone)}
            </span>
          </p>
          <p>
            Sunset:{" "}
            <span data-testid="sunset-time">
              {getTimeString(data.sys.sunset, data.timezone)}
            </span>
          </p>
          <p>Humidity: {data.main.humidity} %</p>
          <p>Visibility: {data.visibility} m</p>
        </main>
      )}
    </>
  );
};
