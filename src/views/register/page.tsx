import React, { FormEvent, useState } from "react";
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
  onRegister: (username: string, password: string) => void;
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [age, setAge] = useState<number | string>(0);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "age" ? value : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirm) {
      newErrors.confirm = "Confirming password is required";
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match";
    }
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData.username, formData.password);
      navigate("/pages/page-1"); // Redirect to a page after registration
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
          onSubmit={handleSubmit}
          className="space-y-6 p-12"
          component="form"
          noValidate
        >
          <div className="flex justify-between">
            <TextField
              helperText={errors.username}
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              variant="outlined"
              label="Username"
              name="username"
              required
            />
            <TextField
              helperText={errors.email}
              onChange={handleChange}
              error={!!errors.email}
              value={formData.email}
              variant="outlined"
              label="Email"
              name="email"
              required
            />
          </div>
          <div className="flex justify-between">
            <TextField
              helperText={errors.password}
              value={formData.password}
              error={!!errors.password}
              onChange={handleChange}
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              required
            />
            <TextField
              helperText={errors.confirm}
              value={formData.confirm}
              error={!!errors.confirm}
              onChange={handleChange}
              variant="outlined"
              label="Confirm password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="flex justify-between">
            <TextField
              helperText={errors.name}
              onChange={handleChange}
              value={formData.name}
              error={!!errors.name}
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
            onChange={handleChange}
            variant="outlined"
            className="w-[15%]"
            type="number"
            label="Age"
            value={age}
            required
          />
          <div className="flex justify-between">
            <TextField
              helperText={errors.city}
              onChange={handleChange}
              value={formData.city}
              error={!!errors.city}
              variant="outlined"
              label="City"
              name="city"
              required
            />
            <TextField
              helperText={errors.country}
              value={formData.country}
              error={!!errors.country}
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
            color="primary"
            type="submit"
          >
            Register
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default Register;
