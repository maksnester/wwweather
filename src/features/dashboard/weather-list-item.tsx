import { useWeatherByLocationQuery } from "../../weather-api";

type Props = {
  location: string;
};

export function WeatherListItem({ location }: Props) {
  const { data, error } = useWeatherByLocationQuery(location);
  if (error) {
    throw error;
  }

  return (
    <div>
      <p>
        Location: <a href={`/${location}`}>{location}</a>
      </p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
