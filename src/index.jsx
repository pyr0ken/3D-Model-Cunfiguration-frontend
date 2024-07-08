import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      gcTime: 60000,
      retry: 3,
      refetchOnWindowFocus: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode have some bugs in google chrome
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </NextUIProvider>
  </QueryClientProvider>,
  // </React.StrictMode>
);
