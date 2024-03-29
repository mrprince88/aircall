import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })
      }
    >
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
