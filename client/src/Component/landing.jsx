import React from "react";
import "../Assets/css/landing.css";
import Logo from "../Assets/Images/iconcommerece.png"
import {NavLink} from "react-router-dom"
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
const Landing = () => {
  return (
    <div className="landing-card">
      <div className="ecomm">
<div>
    <img src={Logo} alt="logo"/>
</div>
<div>
    <ul className="nav-l">
        <li>
        <NavLink to="/product">Product
        <ProductionQuantityLimitsIcon/>
        </NavLink>

        </li>
    </ul>
</div>
      </div>
    </div>
  );
};
export default Landing;
