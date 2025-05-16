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



createRoot(document.getElementById('root')).render(
	<ChakraProvider>
		<TooltipProvider>
			<App />
		</TooltipProvider>
	</ChakraProvider>
);
