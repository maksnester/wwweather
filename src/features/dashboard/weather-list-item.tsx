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

  const UNIT = "°C";

  return (
    <Link to={`/${location}`} className="weather-list-item">
      <h2 className="weather-list-item__location-title">{location}</h2>

      {!!data && (
        <>
          <span data-testid={`${location}-temperature`}>
            {data.main.temp.toFixed(0)}
          </span>
          &nbsp;
          {UNIT}
        </>
      )}

      {!!error && <div>{getMessageFromError(error)}</div>}

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onRemoveLocation(location);
        }}
        data-testid={`${location}-remove`}
      >
        Remove
      </button>
    </Link>
  );
}
