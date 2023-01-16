import "./weather-list.css";
import { WeatherListItem } from "./weather-list-item";

type Props = {
  locations: string[];
  onRemoveLocation: (location: string) => void;
};

export function WeatherList({ locations, onRemoveLocation }: Props) {
  return (
    <div className="weather-list">
      {locations.map((location) => (
        <WeatherListItem
          className="weather-list__item"
          key={location}
          location={location}
          onRemoveLocation={onRemoveLocation}
        />
      ))}
    </div>
  );
}
