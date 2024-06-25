import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="221235482603-0ehg1bjmdak78n0cl4sim4m56n1ee96t.apps.googleusercontent.com">
      {" "}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
