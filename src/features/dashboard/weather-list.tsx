import { WeatherListItem } from "./weather-list-item";

type Props = {
  locations: string[];
};

export function WeatherList({ locations }: Props) {
  return (
    <>
      {locations.map((location) => (
        <WeatherListItem key={location} location={location} />
      ))}
    </>
  );
}
