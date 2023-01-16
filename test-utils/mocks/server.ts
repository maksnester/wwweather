import { setupServer } from "msw/node";
import { geocodingDefaultHandler } from "./geocoding-default-handler";

export const server = setupServer(geocodingDefaultHandler);
