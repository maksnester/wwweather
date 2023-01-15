import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./error-page";
import { LocationWeatherPage } from "./location-weather";
import { DashboardPage } from "./dashboard";

export const routes = [
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:location",
    element: <LocationWeatherPage />,
  },
];

const router = createBrowserRouter(routes);

export function Routes() {
  return <RouterProvider router={router} />;
}
