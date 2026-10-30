import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostHogProvider } from "@posthog/react";
import App from "./App.tsx";
import "./index.css";

const adZoneId = import.meta.env.VITE_ACZONE_ZONE_ID?.trim();
if (adZoneId) {
  let adsEnabled = true;
  try {
    const preference = localStorage.getItem("manyflix_ads_enabled");
    const legacyPreference = localStorage.getItem("moonflix_ads_enabled");
    if (preference === null && legacyPreference !== null) {
      localStorage.setItem("manyflix_ads_enabled", legacyPreference);
      localStorage.removeItem("moonflix_ads_enabled");
    }
    adsEnabled = (preference ?? legacyPreference) !== "false";
  } catch (error) {
    console.warn("Ads disabled because browser storage is unavailable.", error);
    adsEnabled = false;
  }

  if (adsEnabled) {
    const script = document.createElement("script");
    script.id = "aclib";
    script.src = "https://acscdn.com/script/aclib.js";
    script.onload = () => {
      window.aclib?.runAutoTag({ zoneId: adZoneId });
    };
    document.body.appendChild(script);
  }
}

const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: "2026-01-30",
} as const;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_PROJECT_TOKEN}
      options={options}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
