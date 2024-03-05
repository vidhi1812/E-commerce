import React, { useState } from "react";
import "./loginform.css"
const LoginForm = () => {
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
  const submitOn = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div className="logcar">
      <div className="login-card">
        <div>
          <h2 className="head">LOGIN</h2>
        </div>
        <div>
          <form onSubmit={submitOn} className="login-fm">
            <div>
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                onChange={handlechange}
                className="lc"
                required
                autoComplete="off"
                value={user.email}
              />
            </div>
            <br />
            <div>
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                onChange={handlechange}
                className="lc"
                required
                autoComplete="off"
                value={user.password}
              />
            </div>
            <br />
            <div className="beauty">
              <button type="submit" className="button">
                Login
              </button>
            </div>
          </form>
        </div>
        <div>
          <p className="plog">Don't have account?</p>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
