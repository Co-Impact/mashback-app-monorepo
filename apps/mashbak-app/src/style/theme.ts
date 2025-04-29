import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize your primary color
    },
    secondary: {
      main: "#ff4081", // Customize your secondary color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    body1: {
      fontSize: "1rem", // Default body text size for mobile
    },
    body2: {
      fontSize: "0.9rem",
    },
    h1: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 600,
    },
  },
  breakpoints: {
    values: {
      xs: 0, // Extra small screens
      sm: 600, // Small screens (mobile)
      md: 960, // Medium screens (tablet)
      lg: 1280, // Large screens (desktop)
      xl: 1920, // Extra large screens
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "16px", // Mobile-friendly padding
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem", // Button text size for mobile
        },
      },
    },
  },
});

export const hideOnMobileStyle = {
  display: {
    xs: "none",
    sm: "none",
    md: "block",
  },
};

export default theme;
