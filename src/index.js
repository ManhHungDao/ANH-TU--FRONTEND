// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./containers/App";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme"; // Đường dẫn đúng với theme bạn tạo

const renderApp = () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS của MUI */}
      <App />
    </ThemeProvider>,
    document.getElementById("root")
  );
};

renderApp();

// Service Worker
// Learn more: https://bit.ly/CRA-PWA
