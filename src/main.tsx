import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "components/ui/toaster";
import { streamClient } from "services/streamService";
import { Chat } from "stream-chat-react";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Providers/AuthContextProvider.js";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Chat client={streamClient}>
            <App />
          </Chat>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
