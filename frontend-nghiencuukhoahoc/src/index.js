import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
console.log("Server URL:", process.env.REACT_APP_URL_SERVER);
console.log("Server URL:", process.env.REACT_APP_GOOGLE_CLIENT_ID);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      {" "}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
