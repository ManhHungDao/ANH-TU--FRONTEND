// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 15,
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "15px",
    },
  },
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: "#1976d2", // xanh mặc định
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
