"use client";
import { Avatar, Box, Button, Divider, TextField } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        src={""}
        alt={"LogoImage"}
        sx={{ width: "150px", height: "150px" }}
      />
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
        <Button>تسجيل الدخول</Button>
        <Box>
          forget password <a>click here</a>
          need an account <a>Create Account</a>
        </Box>
      </form>
      <Divider sx={{ margin: "4px 0" }} />
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: "5px" }}
          onClick={() => {
            console.log("Login with Google");
          }}
        >
          Login with Google
        </Button>
        <Button
          variant="outlined"
          sx={{ margin: "5px" }}
          onClick={() => {
            console.log("Login with Facebook");
          }}
        >
          Login with Facebook
        </Button>
      </Box>
    </Box>
  );
};
export default LoginPage;
