"use client";
import { FC } from "react";
import { Box, Typography } from "@mui/material";

const Poll: FC = () => {
  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        textAlign: "center",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom></Typography>
    </Box>
  );
};
export default Poll;
