import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
} from "@mui/material";
import { motion } from "framer-motion";

const Register = ({
  onRegister,
}: {
  onRegister: (
    username: string,
    email: string,
    password: string,
    name: string,
    surname: string,
    age: number,
    city: string,
    country: string
  ) => void;
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    name: "",
    surname: "",
    age: 0,
    city: "",
    country: "",
  });
  const navigate = useNavigate();

  // Use refs for form fields
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  // Validate form inputs
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!usernameRef.current?.value)
      newErrors.username = "Username is required";
    if (!emailRef.current?.value) newErrors.email = "Email is required";
    if (!passwordRef.current?.value)
      newErrors.password = "Password is required";
    if (!nameRef.current?.value) newErrors.name = "Name is required";
    if (!surnameRef.current?.value) newErrors.surname = "Surname is required";
    if (!ageRef.current?.value || Number(ageRef.current?.value) <= 0) {
      newErrors.age = "Age must be a positive number";
    }
    if (!cityRef.current?.value) newErrors.city = "City is required";
    if (!countryRef.current?.value) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(
        formData.username,
        formData.password,
        formData.email,
        formData.name,
        formData.surname,
        formData.age,
        formData.city,
        formData.country
      );
      navigate("/pages/page-1", { state: { formData } }); // Redirect to a page after registration
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
        <Typography variant="h4" className="text-center mb-6">
          Register
        </Typography>
        <Typography className="pl-8">
          Already a user?{" "}
          <NavLink to="/login" className="text-blue-500 underline">
            Sign In
          </NavLink>
        </Typography>
        <Box
          className="space-y-6 p-12"
          onSubmit={handleSubmit}
          component="form"
          noValidate
        >
          <div className="flex justify-between">
            <TextField
              helperText={errors.username}
              error={!!errors.username}
              inputRef={usernameRef}
              variant="outlined"
              label="Username"
              name="username"
              required
            />
            <TextField
              helperText={errors.email}
              error={!!errors.email}
              inputRef={emailRef}
              variant="outlined"
              label="Email"
              name="email"
              required
            />
          </div>
          <div className="flex justify-between">
            <TextField
              helperText={errors.password}
              error={!!errors.password}
              inputRef={passwordRef}
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="flex justify-between">
            <TextField
              helperText={errors.name}
              error={!!errors.name}
              inputRef={nameRef}
              variant="outlined"
              label="Name"
              name="name"
              required
            />
            <TextField
              helperText={errors.surname}
              error={!!errors.surname}
              inputRef={surnameRef}
              variant="outlined"
              label="Surname"
              name="surname"
              required
            />
          </div>
          <TextField
            id="age"
            InputProps={{ inputProps: { min: 0 } }}
            helperText={errors.age}
            error={!!errors.age}
            className="w-[15%]"
            variant="outlined"
            inputRef={ageRef}
            type="number"
            label="Age"
            required
          />
          <div className="flex justify-between">
            <TextField
              helperText={errors.city}
              error={!!errors.city}
              inputRef={cityRef}
              variant="outlined"
              label="City"
              name="city"
              required
            />
            <TextField
              helperText={errors.country}
              error={!!errors.country}
              inputRef={countryRef}
              variant="outlined"
              label="Country"
              name="country"
              required
            />
          </div>
          <Button
            className="w-full py-2"
            variant="contained"
            disabled={loading}
            color="primary"
            type="submit"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;
