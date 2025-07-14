import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: {
      default: "#f5f7fa",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
