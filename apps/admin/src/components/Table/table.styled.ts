import { Box, styled } from "@mui/material";

export const TableContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  overflow: 'auto',
  borderRadius: '6px',

  "& table": {
    width: "100%",
    borderCollapse: "collapse",
  },

  "& table thead": {
    borderBottom: theme.palette.mode == 'dark' ? '1px solid rgba(57, 57, 57, 1)' : '1px solid rgba(224, 224, 224, 1)'
  },

  "& thead th": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: "10px",
    textAlign: "left",
    fontWeight: "bold",
    border: "none",  // Removed border from header
  },

  "& tbody tr:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f9f9f9",
    transition: "background-color 0.2s ease-in-out",
  },

  "& tbody td": {
    padding: "10px",
    color: theme.palette.text.primary,
    border: "none",  // Removed border from table data cells
  },

  
  // Custom scrollbar styling
  "&::-webkit-scrollbar": {
    width: "4px",
    height: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[200],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
}));
