import React, { useState } from "react";
import { Stack, Button, Typography, TextField, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false); // Reset email error state
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false); // Reset password error state
  };

  const handleLogin = () => {
    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    // Password length validation
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }

    // Perform login logic here using email and password state values
    console.log("Logging in with email:", email, "and password:", password);

    // Reset email and password fields after login attempt (for demo purposes)
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "300px",
          p: 3,
          bgcolor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" align="center">
            Welcome Back!
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Invalid email format" : ""}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={
              passwordError
                ? "Password must be at least 6 characters long"
                : ""
            }
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
