import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ToastContainer />
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
