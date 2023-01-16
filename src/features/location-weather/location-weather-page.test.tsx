import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { render } from "../../../test-utils/render";
import { routes } from "../routes";

import { rest } from "msw";
import { server } from "../../../test-utils/mocks/server";
import {
  CURRENT_WEATHER_API_URL,
  GEOCODING_API_URL,
} from "../../weather-api/constants";
import { currentWeatherResKhabarovsk } from "../../../test-utils/mocks/current-weather-res-khabarovsk";

const currentWeatherHandlerKhabarovsk = rest.get(
  CURRENT_WEATHER_API_URL,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(currentWeatherResKhabarovsk));
  }
);

describe("location-weather-page", () => {
  it("renders weather details for Khabarovsk city", async () => {
    server.use(currentWeatherHandlerKhabarovsk);

    const router = createMemoryRouter(routes, {
      initialEntries: ["/khabarovsk"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // @ts-ignore getByRole types don't have plain string, but it works
    expect(screen.getByRole("heading", "khabarovsk")).toBeInTheDocument();
    expect(document.title).toEqual("Khabarovsk weather");

    expect(screen.getByTestId("weather-type")).toHaveTextContent("Clear");
    expect(screen.getByTestId("temperature")).toHaveTextContent("-24");
    expect(screen.getByTestId("sunrise-time")).toHaveTextContent("8:46 AM");
    expect(screen.getByTestId("sunset-time")).toHaveTextContent("5:31 PM");
  });

  it("renders an error message for unknown location", async () => {
    server.use(
      rest.get(GEOCODING_API_URL, (req, res, ctx) => {
        // actual API reacts the same way
        return res(ctx.status(200), ctx.json([]));
      })
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/something-that-totally-makes-no-sense"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(
      // @ts-ignore getByRole types don't have plain string, but it works
      screen.getByRole("heading", "something-that-totally-makes-no-sense")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Can't find any locations with name/i)
    ).toBeInTheDocument();
  });

  it("renders an error message for server error", async () => {
    server.use(
      rest.get(GEOCODING_API_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json("server goes brrrr"));
      })
    );

    const router = createMemoryRouter(routes, {
      initialEntries: ["/tokyo"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    // @ts-ignore getByRole types don't have plain string, but it works
    expect(screen.getByRole("heading", "tokyo")).toBeInTheDocument();

    expect(screen.getByText(/server goes brrrr/i)).toBeInTheDocument();
  });
});
