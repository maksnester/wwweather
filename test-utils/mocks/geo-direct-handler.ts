import { rest } from "msw";

export const geoDirectHandler = rest.get(
  "https://api.openweathermap.org/geo/1.0/direct",
  (req, res, ctx) => {
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
  }
);
