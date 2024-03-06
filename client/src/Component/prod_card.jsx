import React from "react";
import Logo1 from "../Assets/Images/login.jpg"
import "../Assets/css/product.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Prod_cart = () => {
  return (
    <div className="prodcart1">
      <div className="prodct6">
        <img src={Logo1} alt=""  className="pro5"/>
      </div>
      <div className="pro_cart5443">
        <div className="prort56">prodtcs name</div>
        <div className="prod47">price</div>
      </div>
      <div className="pro_ct56">
      What makes us different is that 17TRACK is an all-in-one package tracking platform that brings together an ever-increasing number of 2,175 carriers.

      </div>
      <div className="pryu2"><div className="prod_prop">category</div>
      <div className="prod_btn"> <button className="btn">
       
       <AddShoppingCartIcon/> ADD TO CART</button></div></div>
    </div>
  );
};
export default Prod_cart;