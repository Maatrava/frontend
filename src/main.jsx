import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { OnboardingProvider } from "./pages/onBoarding/OnboardingContext.jsx";  
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <OnboardingProvider>
          <App />
        </OnboardingProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
