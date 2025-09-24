import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { useData } from "../context/dataContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useData();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    navigate("/movies");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 h-screen bg-amber-300/15">
      <h1 className="text-3xl text-amber-600 font-bold">Login</h1>
      <FormControl
        onSubmit={handleSubmit}
        component={"form"}
        className="flex flex-col gap-8"
      >
        <TextField
          label="Username"
          type="text"
          name="username"
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />
        <Button
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
          color="primary"
          type="submit"
          size="large"
          variant="contained"
        >
          Login
        </Button>
        <Link
          to="/register"
          className="text-amber-600 underline hover:text-amber-800 transition duration-200"
        >
          Don't have an account? Register here
        </Link>
      </FormControl>
    </div>
  );
};

export default Login;
