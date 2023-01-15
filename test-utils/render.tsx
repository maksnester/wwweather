import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";

type CustomOptions = Omit<RenderOptions, "wrapper"> & {
  // add things as needed
};

export const render = (ui: ReactElement, options?: CustomOptions) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    // react-query logs errors by default
    logger: {
      /* eslint-disable @typescript-eslint/no-empty-function */
      log: () => {},
      warn: () => {},
      error: () => {},
      /* eslint-enable @typescript-eslint/no-empty-function */
    },
  });

  const AllProviders = ({ children }: PropsWithChildren): ReactElement => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return rtlRender(ui, {
    wrapper: AllProviders,
    ...options,
  });
};
