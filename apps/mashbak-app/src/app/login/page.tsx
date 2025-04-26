"use client";
import { Box, TextField } from "@mui/material";
import Image from "next/image";

const LoginPage = () => {
  return (
    <Box>
      <Image src={""} alt={"LogoImage"} loading={"lazy"} />
      <form>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="blogTitle"
          onChange={(a) => {
            console.log(a.target.value);
          }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="blogTitle"
          onChange={(a) => {
            console.log(a.target.value);
          }}
          required
        />
        <Box>
          forget password <a>click here</a>
          need an account <a>Create Account</a>
        </Box>
      </form>
      -----------------
      {/*    TODO: login with google or linkedin */}
    </Box>
  );
};
export default LoginPage;
