import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./features/error-page";
import { LocationWeatherPage } from "./features/location-weather";
import { DashboardPage } from "./features/dashboard";

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
