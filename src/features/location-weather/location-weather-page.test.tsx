import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LocationWeatherPage } from "./location-weather-page";

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });

  // it("renders", () => {
  //   render(<LocationWeatherPage />);
  //
  //   screen.debug();
  // });
});
