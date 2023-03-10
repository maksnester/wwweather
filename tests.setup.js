import { afterAll, afterEach, beforeEach, beforeAll, expect, vi } from "vitest";
import { server } from "./test-utils/mocks/server";

import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// ----------------------
// RTL related extensions
// ----------------------

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// --------------------------------
// Mock service worker server setup
// --------------------------------

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen({
    onUnhandledRequest: "error",
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
beforeEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
  server.close();
});
