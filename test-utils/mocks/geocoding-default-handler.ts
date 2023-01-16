import { rest } from "msw";
import { GEOCODING_API_URL } from "../../src/weather-api/constants";
import { geocodingResLondon } from "./geocoding-res-london";
import { geocodingResBerlin } from "./geocoding-res-berlin";
import { geocodingResKhabarovsk } from "./geocoding-res-khabarovsk";

export const geocodingDefaultHandler = rest.get(
  GEOCODING_API_URL,
  (req, res, ctx) => {
    switch (req.url.searchParams.get("q")) {
      case "london":
        return res(ctx.json(geocodingResLondon));
      case "berlin":
        return res(ctx.json(geocodingResBerlin));
      case "khabarovsk":
        return res(ctx.json(geocodingResKhabarovsk));
      default:
        throw new Error("Unexpected geocoding request");
    }
  }
);
