import React, { useEffect, useState } from "react";
import "../Assets/css/Signupform.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
export const Signupform = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAuth();
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  });
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const submitOn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/auth/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        setUser({
          username: "",
          phone: "",
          email: "",
          password: "",
        });
        toast.success("Register Successfully");
        navigate("/login");
      }
    } catch (e) {
      toast.error("Register Failed");
    }
  };
  return (
    <div className="Signup-card">
      <div className="Sign-car">
        <div>
          <h2 className="head1">SIGNUP</h2>
        </div>
        <div>
          <Box
            component="form"
            onSubmit={submitOn}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div id="namecard">
              <TextField
                className="lc"
                required
                id="outlined-required"
                type="text"
                placeholder="Enter Username"
                label="Username"
                name="username"
                autoComplete="off"
                onChange={handlechange}
                value={user.username}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                className="lc"
                type="number"
                placeholder="Enter Your Mobile phone"
                label="Phone"
                name="phone"
                autoComplete="off"
                onChange={handlechange}
                value={user.phone}
              />
            </div>
            <div>
              <TextField
                className="lc"
                required
                id="outlined-required"
                type="email"
                placeholder="Enter Your Email"
                label="Email"
                name="email"
                autoComplete="off"
                onChange={handlechange}
                value={user.email}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                className="lc"
                type="password"
                placeholder="Enter Your Password"
                label="Password"
                name="password"
                autoComplete="off"
                onChange={handlechange}
                value={user.password}
              />
            </div>
            <div className="beauty">
              <Button variant="contained" type="submit">
                Signup
              </Button>
            </div>
          </Box>
        </div>
        <div>
          <p className="plog">
            Already Register?<NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Signupform;
