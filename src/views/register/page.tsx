import React, { ChangeEvent, FormEvent, useState } from "react";
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (formData.age <= 0) newErrors.age = "Age must be a positive number";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(
        formData.username,
        formData.email,
        formData.password,
        formData.name,
        formData.surname,
        formData.age,
        formData.city,
        formData.country
      );
      navigate("/pages/profile", { state: { formData } });
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
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              label="Username"
              name="username"
              required
            />
            <TextField
              helperText={errors.email}
              error={!!errors.email}
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              label="Email"
              name="email"
              required
            />
          </div>
          <TextField
            helperText={errors.password}
            error={!!errors.password}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            required
          />
          <div className="flex justify-between">
            <TextField
              helperText={errors.name}
              error={!!errors.name}
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              label="Name"
              name="name"
              required
            />
            <TextField
              helperText={errors.surname}
              error={!!errors.surname}
              value={formData.surname}
              onChange={handleChange}
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
            value={formData.age}
            onChange={handleChange}
            variant="outlined"
            type="number"
            label="Age"
            name="age"
            required
          />
          <div className="flex justify-between">
            <TextField
              helperText={errors.city}
              error={!!errors.city}
              value={formData.city}
              onChange={handleChange}
              variant="outlined"
              label="City"
              name="city"
              required
            />
            <TextField
              helperText={errors.country}
              error={!!errors.country}
              value={formData.country}
              onChange={handleChange}
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
