"use client";
import { useEffect } from "react";

const SiennaWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
    script.defer = true;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // tidak render apa-apa, hanya memuat script
};

export default SiennaWidget;
