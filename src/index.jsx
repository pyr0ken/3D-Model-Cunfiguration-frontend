import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

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
    </NextUIProvider>
  </QueryClientProvider>,
  // </React.StrictMode>
);
