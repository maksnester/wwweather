import { useWeatherByLocationQuery } from "../../weather-api";
import "./weather-list-item.css";
import { Link } from "react-router-dom";

type Props = {
  location: string;
  onRemoveLocation: (location: string) => void;
};

export function WeatherListItem({ location, onRemoveLocation }: Props) {
  const { data, error } = useWeatherByLocationQuery(location);
  const errorMessage =
    (error instanceof Error && error.message) || "Something went wrong";
  return (
    <div className="weather-list-item">
      <p>
        Location: <Link to={`/${location}`}>{location}</Link>
      </p>
      <button type="button" onClick={() => onRemoveLocation(location)}>
        Remove
      </button>
      <>
        {error && <p>{errorMessage}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </>
    </div>
  );
}
