type Props = {
  location: string;
};

export function WeatherListItem({ location }: Props) {
  return (
    <div>
      Location: <a href={`/${location}`}>{location}</a>
    </div>
  );
}
