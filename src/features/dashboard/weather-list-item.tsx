import { useWeatherByLocationQuery } from "../../weather-api";
import "./weather-list-item.css";
import { Link } from "react-router-dom";
import { getMessageFromError } from "../../utils/getMessageFromError";

type Props = {
  location: string;
  onRemoveLocation: (location: string) => void;
};

export function WeatherListItem({ location, onRemoveLocation }: Props) {
  const { data, error } = useWeatherByLocationQuery(location);

  return (
    <div className="weather-list-item">
      <p>
        Location: <Link to={`/${location}`}>{location}</Link>
      </p>
      <button type="button" onClick={() => onRemoveLocation(location)}>
        Remove
      </button>
      <>
        {error && <p>{getMessageFromError(error)}</p>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </>
    </div>
  );
}
