// src/main.jsx o src/index.jsx
import "./index.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const theme = extendTheme({
  config: {
    initialColorMode: 'system', // Cambiado a system
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
      }
    })
  }
});

createRoot(document.getElementById('root')).render(
	<ChakraProvider theme={theme}>
		<TooltipProvider>
			<CSSReset />
			<App />
		</TooltipProvider>
	</ChakraProvider>
);
