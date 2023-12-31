import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const history = useHistory();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      const { user, token } = response.data;
      // save the token and user data in localStorage or a cookie
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/statistics");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  const signup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        email,
        password,
      });
      const { user, token } = response.data;
      // save the token and user data in localStorage or a cookie
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      history.push("/statistics");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.error);
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}>
      <Box display="flex" flexDirection="column">
        <TextField
          sx={{ marginBottom: "1rem" }}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Box>
          <Button onClick={login}>Login</Button>
          <Button onClick={signup}>Signup</Button>
        </Box>

        {error && <Typography sx={{ color: "common.red" }}>{error}</Typography>}
      </Box>
    </Grid>
  );
};

export default LoginPage;
