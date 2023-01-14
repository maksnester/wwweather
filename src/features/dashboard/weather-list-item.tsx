import { useWeatherByLocationQuery } from "../../weather-api";
import "./weather-list-item.css";

type Props = {
  location: string;
  onRemoveLocation: (location: string) => void;
};

export function WeatherListItem({ location, onRemoveLocation }: Props) {
  const { data, error } = useWeatherByLocationQuery(location);
  if (error) {
    throw error;
  }

  return (
    <div className="weather-list-item">
      <p>
        Location: <a href={`/${location}`}>{location}</a>
      </p>
      <button type="button" onClick={() => onRemoveLocation(location)}>
        Remove
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
