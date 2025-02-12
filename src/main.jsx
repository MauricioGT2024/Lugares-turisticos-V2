// src/main.jsx o src/index.jsx
import "./index.css";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Puedes iniciar en 'light' o 'dark'
    useSystemColorMode: false, // Si quieres que dependa del sistema, ponlo en `true`
  },
});

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <CSSReset />
    <App />
  </ChakraProvider>,
);
