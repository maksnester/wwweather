import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { render } from "../../../test-utils/render";
import { routes } from "../routes";

describe("something truthy and falsy", () => {
  it("renders weather details for Khabarovsk city", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/khabarovsk"],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText("khabarovsk")).toBeInTheDocument();

    screen.debug();
  });
});
