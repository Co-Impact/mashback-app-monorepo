import { Box, TextField } from "@mui/material";

const LoginPage = () => {
  return (
    <Box>
      <img src={""} alt={"LogoImage"} loading={"lazy"} />
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
