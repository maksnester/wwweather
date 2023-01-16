import { useWeatherByLocationQuery } from "../../weather-api";
import "./weather-list-item.css";
import { Link } from "react-router-dom";
import { getMessageFromError } from "../../utils/getMessageFromError";

type Props = {
  className?: string;
  location: string;
  onRemoveLocation: (location: string) => void;
};

export function WeatherListItem({
  location,
  onRemoveLocation,
  className = "",
}: Props) {
  const { data, error } = useWeatherByLocationQuery(location);

  const UNIT = "°C";

  return (
    <Link to={`/${location}`} className={`weather-list-item ${className}`}>
      <h2 className="weather-list-item__location-title">{location}</h2>

      {!!error && (
        <div className="weather-list-item__error">
          {getMessageFromError(error)}
        </div>
      )}

      {!!data && (
        <div className="weather-list-item__temperature">
          <span data-testid={`${location}-temperature`}>
            {data.main.temp.toFixed(0)}
          </span>
          &nbsp;
          {UNIT}
        </div>
      )}

      <button
        className="weather-list-item__remove-button"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onRemoveLocation(location);
        }}
        data-testid={`${location}-remove`}
      >
        ⓧ
      </button>
    </Link>
  );
}
