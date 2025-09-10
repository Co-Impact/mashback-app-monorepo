import { FC, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PublicClientApplication } from "@azure/msal-browser";
import { MicrosoftLogInConfig } from "../../api/log-in/login.ts";

const theme = createTheme();
const msalInstance = new PublicClientApplication(MicrosoftLogInConfig);
export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleLogin = async () => {
    try {
      const loginRequest = {
        scopes: ["user.read"],
      };
      await msalInstance.initialize();
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      console.log(loginResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              disabled={true}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              disabled={true}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              disabled={true}
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={handleLogin}
            >
              Sign In with Microsoft 365
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
