import "./style/App.scss";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { darkTheme, lightTheme, useTheme } from "./hooks/useTheme.tsx";
import { Box, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";

function App() {
  const { isNightMode } = useTheme();

  return (
    <ThemeProvider theme={isNightMode ? darkTheme : lightTheme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
        <ToastContainer
          theme={isNightMode ? "dark" : "light"}
          position="top-right"
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
