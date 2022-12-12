import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
  <Router>
    <AuthProviderWrapper>
        <App />
    </AuthProviderWrapper>
  </Router>
  </ChakraProvider>
);
