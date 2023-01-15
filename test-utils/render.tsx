import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { PropsWithChildren, ReactElement } from "react";

type CustomOptions = Omit<RenderOptions, "wrapper"> & {
  // add things as needed
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const render = (ui: ReactElement, options?: CustomOptions) => {
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
