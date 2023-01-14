import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LocationDTO, WeatherDTO } from "./types";

const fetchWeatherByLocationQuery = async (locationQuery: string) => {
  const appId = import.meta.env.VITE_API_KEY;

  const locationResponse = await axios.get<LocationDTO[]>(
    `https://api.openweathermap.org/geo/1.0/direct`,
    {
      params: {
        // City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
        q: locationQuery,
        appId,
        limit: 1,
      },
    }
  );

  const { lat, lon } = locationResponse.data[0];

  const weatherResponse = await axios.get<WeatherDTO>(
    `https://api.openweathermap.org/data/2.5/weather`,
    {
      params: {
        lat,
        lon,
        appId,
        units: "metric",
      },
    }
  );

  return weatherResponse.data;
};

export const useWeatherByLocationQuery = (locationQuery: string) => {
  return useQuery(
    [locationQuery],
    () => fetchWeatherByLocationQuery(locationQuery),
    {
      staleTime: 1000 * 60,
    }
  );
};
