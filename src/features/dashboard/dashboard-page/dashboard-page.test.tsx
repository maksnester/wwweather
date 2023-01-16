import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { server } from "../../../../test-utils/mocks/server";
import { routes } from "../../../routes";
import { render } from "../../../../test-utils/render";

import {
  CURRENT_WEATHER_API_URL,
  GEOCODING_API_URL,
} from "../../../weather-api/constants";

import { rest } from "msw";
import { currentWeatherResLondon } from "../../../../test-utils/mocks/current-weather-res-london";
import { currentWeatherResBerlin } from "../../../../test-utils/mocks/current-weather-res-berlin";
import { currentWeatherResKhabarovsk } from "../../../../test-utils/mocks/current-weather-res-khabarovsk";

describe("location-weather-page", () => {
  beforeEach(() => {
    const currentWeatherHandler = rest.get(
      CURRENT_WEATHER_API_URL,
      (() => {
        // that's messy a bit, but this request don't have ids but unreadable lan, lon as params
        // a better workaround could be to just have readable constants for the lan/lon pairs and put corresponding mocks
        // in a similar fashion as done for the default geocodingHandler
        let requestCount = 0;
        return (req, res, ctx) => {
          requestCount += 1;

          if (requestCount === 1) {
            return res(ctx.json(currentWeatherResLondon));
          }
          if (requestCount === 2) {
            return res(ctx.json(currentWeatherResBerlin));
          }
          if (requestCount === 3) {
            return res(ctx.json(currentWeatherResKhabarovsk));
          }
          throw new Error("Unexpected current weather request");
        };
      })()
    );

    server.use(currentWeatherHandler);

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
  });

  it("renders default locations (Berlin, London) and their temperatures", async () => {
    expect(await screen.findByTestId("london-temperature")).toHaveTextContent(
      "5"
    );

    expect(await screen.findByTestId("berlin-temperature")).toHaveTextContent(
      "7"
    );

    expect(screen.getByText("london")).toBeInTheDocument();
    expect(screen.getByText("berlin")).toBeInTheDocument();
  });

  it("should be possible to remove a location from the list", async () => {
    await waitFor(() => {
      expect(screen.getByText("london")).toBeInTheDocument();
      expect(screen.getByText("berlin")).toBeInTheDocument();
    });

    await userEvent.click(screen.getByTestId("london-remove"));

    expect(screen.queryByText("london")).not.toBeInTheDocument();
    expect(screen.getByText("berlin")).toBeInTheDocument();

    // do not save that change in localstorage to not affect the next tests
  });

  it("should be possible to add new location to the list", async () => {
    await userEvent.type(screen.getByRole("textbox"), "Khabarovsk{enter}");

    await waitFor(() => {
      expect(screen.getByText("khabarovsk")).toBeInTheDocument();
      expect(screen.getByTestId("khabarovsk-temperature")).toHaveTextContent(
        "-24"
      );
    });
  });

  it("should display error for failed current weather request", async () => {
    server.use(
      rest.get(CURRENT_WEATHER_API_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json("Something terrible happened"));
      })
    );

    expect(await screen.findByText(/Something terrible happened/i));
  });

  it("should display error for unknown location", async () => {
    server.use(
      rest.get(GEOCODING_API_URL, (req, res, ctx) => {
        // actual API reacts the same way
        return res(ctx.status(200), ctx.json([]));
      })
    );

    await userEvent.type(
      screen.getByRole("textbox"),
      "This location does not exist {enter}"
    );

    expect(
      screen.getByText(/This location does not exist/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Can't find any locations with name/i)
    ).toBeInTheDocument();
  });
});
