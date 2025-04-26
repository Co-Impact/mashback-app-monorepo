"use client";
import { Box, TextField } from "@mui/material";
import { FC } from "react";

const RegisterPage: FC = () => {
  return (
    <Box>
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="fullName"
        onChange={(a) => {
          console.log(a.target.value);
        }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="Email"
        onChange={(a) => {
          console.log(a.target.value);
        }}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Pssword"
        name="Pssword"
        onChange={(a) => {
          console.log(a.target.value);
        }}
        required
      />
      <Box>{/*    TODO: thank you Page here*/}</Box>
    </Box>
  );
};

export default RegisterPage;
