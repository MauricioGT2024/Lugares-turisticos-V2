// src/main.jsx o src/index.jsx
import "./index.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Puedes iniciar en 'light' o 'dark'
    useSystemColorMode: false, // Si quieres que dependa del sistema, ponlo en `true`
  },
  styles: {
    global: {
      'body': {
        transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
      },
      '*': {
        transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out'
      }
    }
  }
});

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
);
