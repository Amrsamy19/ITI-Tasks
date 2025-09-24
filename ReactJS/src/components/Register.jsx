import {
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
  Radio,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/dataContext";

const Register = () => {
  const { login } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ genres: [] });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckBox = (e) => {
    if (formData.genres.includes(e.target.value)) {
      setFormData({
        ...formData,
        genres: formData.genres.filter((genre) => genre !== e.target.value),
      });
      return;
    }

    setFormData({
      ...formData,
      genres: [...formData.genres, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-16 h-screen bg-amber-300/15">
      <h1 className="text-3xl text-amber-600 font-bold">Register</h1>
      <FormControl
        onSubmit={handleSubmit}
        component={"form"}
        className="flex flex-col gap-8"
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          onChange={handleChange}
        />
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
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row name="gender" onChange={handleChange}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Favourite Genre</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox onChange={handleCheckBox} />}
              value={"Action"}
              label="Action"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckBox} />}
              value={"Comedy"}
              label="Comedy"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckBox} />}
              value={"Horror"}
              label="Horror"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckBox} />}
              value={"Animation"}
              label="Animation"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleCheckBox} />}
              value={"Drama"}
              label="Drama"
            />
          </FormGroup>
        </FormControl>
        <Button
          sx={{ fontWeight: "bold", fontSize: "1rem" }}
          color="primary"
          type="submit"
          size="large"
          variant="contained"
        >
          Register
        </Button>
      </FormControl>
    </div>
  );
};

export default Register;
