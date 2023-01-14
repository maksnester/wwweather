export type LocationDTO = {
  name: "London";
  /** @example { en: "London", ... } */
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  /**
   * ISO 3166 country codes
   * @example "GB"
   */
  country: string;
};

type WeatherDescription = {
  id: number;

  /** @example "Clouds" */
  main: string;

  /** @example "scattered clouds" */
  description: string;

  /** @example "03d" */
  icon: string;
};

// https://openweathermap.org/current#current_JSON
export type WeatherDTO = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherDescription[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
};
