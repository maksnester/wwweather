import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchWeatherByLocation = (location: string) => {
  return Promise.resolve({
    t: 123,
  });
};

export const useWeatherByLocation = (location: string) => {
  return useQuery([location], () => fetchWeatherByLocation(location));
};
