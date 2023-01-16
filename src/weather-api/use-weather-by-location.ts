import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LocationDTO, WeatherDTO } from "./types";
import { CURRENT_WEATHER_API_URL, GEOCODING_API_URL } from "./constants";

const fetchWeatherByLocationQuery = async (locationQuery: string) => {
  const appId = "84308299a66a5688a65109c2c821b195";

  const locationResponse = await axios.get<LocationDTO[]>(GEOCODING_API_URL, {
    params: {
      // City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
      q: locationQuery,
      appId,
      limit: 1,
    },
  });

  if (!locationResponse.data[0]) {
    throw new Error(`Can't find any locations with name "${locationQuery}"`);
  }

  const { lat, lon } = locationResponse.data[0];

  const weatherResponse = await axios.get<WeatherDTO>(CURRENT_WEATHER_API_URL, {
    params: {
      lat,
      lon,
      appId,
      units: "metric",
    },
  });

  return weatherResponse.data;
};

export const useWeatherByLocationQuery = (locationQuery: string) => {
  return useQuery(
    [locationQuery],
    () => fetchWeatherByLocationQuery(locationQuery),
    {
      staleTime: 1000 * 60 * 5,
      retry: false,
    }
  );
};
