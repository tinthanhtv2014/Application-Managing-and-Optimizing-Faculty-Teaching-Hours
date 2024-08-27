import "./global.css";

import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { useState, useEffect } from "react";
import Router from "./routes/sections";
import ThemeProvider from "./theme";
import Loading from "../../../component/ComponentLoading/CompnentLoading.tsx";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}
