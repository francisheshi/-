import React, { useState, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import useAuth from "../../context/AuthContext";

const Login = ({
  onLogin,
}: {
  onLogin: (username: string, password: string) => any;
}) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isAuthenticated = onLogin(credentials.username, credentials.password);

    if (isAuthenticated) {
      setError("");
      // Call login from useAuth
      login({ username: credentials.username }); // Pass user data as needed
      navigate("/pages/page-1");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container
      className="flex items-center justify-center h-screen w-full"
      maxWidth="md"
    >
      <Card
        transition={{ duration: 0.5 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        component={motion.div}
        className="w-full"
        elevation={2}
      >
        <CardContent>
          <Typography variant="h4" className="text-center mb-10">
            Login
          </Typography>
          <Typography className="pl-8">
            Can't find an existing account?{" "}
            <NavLink to="/register" className="text-blue-500 underline">
              Sign Up
            </NavLink>
          </Typography>
          <Box
            className="space-y-4 mt-6"
            onSubmit={handleSubmit}
            component="form"
            noValidate
          >
            <div className="flex justify-around">
              <TextField
                value={credentials.username}
                onChange={handleChange}
                variant="outlined"
                label="Username"
                name="username"
                required
              />
              <TextField
                value={credentials.password}
                onChange={handleChange}
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                required
              />
            </div>
            {error && <Typography color="error">{error}</Typography>}
            <Button
              className="w-full py-2"
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
