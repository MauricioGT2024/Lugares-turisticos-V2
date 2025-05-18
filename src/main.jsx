// src/main.jsx o src/index.jsx
import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Chakra
import {
  ChakraProvider,
  extendTheme,
  useColorModeValue,
} from "@chakra-ui/react";

// Radix UI
import { TooltipProvider } from "@radix-ui/react-tooltip";

// App
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Apply theme from localStorage as early as possible
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TooltipProvider>
      <App />
    </TooltipProvider>
  </BrowserRouter>
);
