import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

// Custom theme with dark black and creamy white
const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Default to dark mode
    useSystemColorMode: false, // Ignore system settings
  },
  colors: {
    brand: {
      darkBg: "#0f0f0f", // Very dark black for dark mode background
      lightBg: "#f5f5dc", // Creamy white for light mode background
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "brand.darkBg" : "brand.lightBg", // Dynamically set background
        color: props.colorMode === "dark" ? "whiteAlpha.900" : "gray.800", // Adjust text color
      },
    }),
  },
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
