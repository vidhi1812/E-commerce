import React, { useEffect, useState } from "react";
import "../Assets/css/loginform.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
axios.defaults.withCredentials = true;
const LoginForm = () => {
  const { isUserLoggedIn, isloading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn) navigate("/");
  });
  const [user, setUser] = useState({
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
        "http://localhost:9000/api/auth/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setUser({
          email: "",
          password: "",
        });
        toast.success("Login Successfully");
        window.location.reload();
        navigate("/");
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };
  return (
    <div className="logcar">
      <div className="login-card">
        <div>
          <h2 className="head">LOGIN</h2>
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
            {/* <form onSubmit={submitOn} className="login-fm"> */}
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
            <br />
            <div className="beauty">
              {/* <button type="submit" className="button">
                  Login
                </button> */}
              <Button variant="contained" type="submit">
                Login
              </Button>
            </div>
            {/* </form> */}
          </Box>
        </div>
        <div>
          <p className="plog">
            Don't have account?<NavLink to="/signup">Signup</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
