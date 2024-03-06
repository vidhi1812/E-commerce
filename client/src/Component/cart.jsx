import React from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Logo2 from "../Assets/Images/login.jpg";
import "../Assets/css/cart.css";
const Cart = () => {
  return (
    <div className="remocdf">
      <div>
        <img src={Logo2} alt="" className="removecart" />
      </div>

      <div className="renkf">
        <div>Tennis Ball</div>
        <div> 67789</div>
      </div>
      <div className="bgyt">
        <button className="btncd"><RemoveShoppingCartIcon />Remove</button>
      </div>
    </div>
  );
};
export default Cart;
