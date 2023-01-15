// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://api.openweathermap.org/geo/1.0/direct", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "Khabarovsk",
          local_names: {
            en: "Khabarovsk",
          },
          lat: 48.481403,
          lon: 135.076935,
          country: "RU",
          state: "Khabarovsk Krai",
        },
      ])
    );
  }),

  rest.get(
    "https://api.openweathermap.org/data/2.5/weather",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          coord: { lon: 135.0769, lat: 48.4814 },
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
          ],
          base: "stations",
          main: {
            temp: -24.12,
            feels_like: -31.12,
            temp_min: -24.12,
            temp_max: -24.12,
            pressure: 1019,
            humidity: 53,
          },
          visibility: 10000,
          wind: { speed: 3, deg: 230 },
          clouds: { all: 0 },
          dt: 1673799959,
          sys: {
            type: 1,
            id: 8867,
            country: "RU",
            sunrise: 1673822771,
            sunset: 1673854304,
          },
          timezone: 36000,
          id: 2022890,
          name: "Khabarovsk",
          cod: 200,
        })
      );
    }
  ),
];
