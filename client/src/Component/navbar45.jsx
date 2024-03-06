import React from "react";
import "../Assets/css/navbar45.css";
import Logo from "../Assets/Images/iconcommerece.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/store";
const Navbar45 = () => {
  const { isUserLoggedIn } = useAuth();
  return (
    <div className="nav-card">
      <div className="ecomm">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div>
        <ul className="nav-l">
          <li>
            <NavLink to="/product" activeClassName="active">
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="active">
              Cart
            </NavLink>
          </li>
          {!isUserLoggedIn ? (
            <>
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup" activeClassName="active">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/logout" activeClassName="active">
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/admin" activeClassName="disabled">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/seller" activeClassName="disabled">
              Seller
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar45;
