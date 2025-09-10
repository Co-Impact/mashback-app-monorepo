import React, { createContext, useState, useContext, ReactNode } from "react";
import { useMediaQuery, createTheme } from "@mui/material";
import { blue, deepPurple } from "@mui/material/colors";

// Define the theme color constants
const primaryColor = {
  main: blue[700],
  light: blue[300],
  dark: blue[900],
  contrastText: '#ffffff',
};

const secondaryColor = {
  main: deepPurple[500],
  light: deepPurple[300],
  dark: deepPurple[700],
  contrastText: '#ffffff',
};

export const getAutofillStyles = (mode: 'light' | 'dark') => ({
  '&:-webkit-autofill': {
    WebkitBoxShadow: `0 0 0 1000px ${
      mode === 'dark' ? '#424242' : '#ffffff'
    } inset`, 
    WebkitTextFillColor: mode === 'dark' ? '#e0e0e0' : '#000000',
    transition: 'background-color 5000s ease-in-out 0s',
  },
});


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: primaryColor,
    secondary: secondaryColor,
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4f4f4f',
      disabled: '#9e9e9e',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: getAutofillStyles('light'),
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: primaryColor,
    secondary: secondaryColor,
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      disabled: '#777777',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: getAutofillStyles('dark'),
      },
    },
  },
});

// Create the context for the theme
interface ThemeContextType {
  isNightMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getSystemTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  const initTheme = () => {
    return savedTheme === "dark" || getSystemTheme;
  };

  const [isNightMode, setIsNightMode] = useState(initTheme());

  const toggleTheme = () => {
    const newTheme = !isNightMode;
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    setIsNightMode(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
