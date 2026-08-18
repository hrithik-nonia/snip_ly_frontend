import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isTokenValid } from "./utils/helperFunctions.js";

const queryClient = new QueryClient();

let isInitialized = false;
async function initAuth() {
  if (isInitialized) return;
  isInitialized = true;

  const token = localStorage.getItem("access_token");

  if (token && isTokenValid()) {
    return;
  }

  try {
    // ← axiosInstance ki jagah plain fetch use karo
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include", // cookie jayegi
    });

    if (!response.ok) throw new Error("Refresh failed");

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
  } catch {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
  }
}

initAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
