import React, { useState, useEffect, useRef } from "react";

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState(() => {
    const storedKey = import.meta.env.VITE_GEMINI_KEY || localStorage.getItem("ai_api_key");
    return storedKey || "";
  });

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("ai_api_key", apiKey);
    }
  }, [apiKey]);

  const clearApiKey = () => {
    localStorage.removeItem("ai_api_key");
    setApiKey("");
  };

  return [apiKey, setApiKey, clearApiKey];
};