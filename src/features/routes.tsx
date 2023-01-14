import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./error-page";
import { LocationWeatherPage } from "./location-weather";
import { DashboardPage } from "./dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:location",
    element: <LocationWeatherPage />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
