import React, { useEffect, useState } from "react";
import "../Assets/css/Signupform.css";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
import { useAuth } from "../store/store";
export const Signupform = () => {
  const navigate = useNavigate();
  const {isUserLoggedIn} = useAuth();
  useEffect(()=>{
    if(isUserLoggedIn){
      navigate('/');
    }
  })
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
  const submitOn = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:9000/api/auth/register",user,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res)
      if(res.status===201){
        setUser({
          username: "",
          phone: "",
          email: "",
          password: "",
        });
        toast.success('Register Successfully');
        navigate('/login');
      }
      else{
        toast.error('Register Failed');
      }
    }
    catch(e){
      console.log(e);
    }
  };
  return (
    <div className="Signup-card">
      <div className="Sign-car">
        <div>
          <h2 className="head1">SIGNUP</h2>
        </div>
        <div>
          <form onSubmit={submitOn} className="login-fm">
            <div id="namecard">
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handlechange}
                className="lc1"
                required
                autoComplete="off"
                value={user.username}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Enter Your Mobile phone"
                name="phone"
                onChange={handlechange}
                className="lc1"
                required
                autoComplete="off"
                value={user.phone}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                onChange={handlechange}
                className="lc1"
                required
                autoComplete="off"
                value={user.email}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                onChange={handlechange}
                className="lc1"
                required
                autoComplete="off"
                value={user.password}
              />
            </div>
            <div className="beauty">
              <button type="submit" className="button1">
                SIGNUP
              </button>
            </div>
          </form>
        </div>
        <div>
          <p className="plog">Already Register?<NavLink to='/login'>Login</NavLink></p>
        </div>
      </div>
    </div>
  );
};
export default Signupform;
