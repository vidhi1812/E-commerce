import React, { useState } from "react";
import "../Assets/css/Signupform.css";

export const Signupform = () => {
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
  const submitOn = (e) => {
    e.preventDefault();
    console.log(user);
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

            <div></div>

            <div className="beauty">
              <button type="submit" className="button1">
                {" "}
                SIGNUP
              </button>
            </div>
          </form>
        </div>
        <div>
          <p className="plog">Already Register?</p>
        </div>
      </div>
    </div>
  );
};
export default Signupform;
