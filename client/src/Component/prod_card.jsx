import React from "react";
const Prod_cart = (props) => {
  return (
    <div>
      <div>
        <img src={props.image} alt="" />
      </div>
      <div>
        <div>{props.name}</div>
        <div>{props.price}</div>
      </div>
      <div>
        {props.description}
      </div>
      <div><div>{props.category}</div>
      <div><button className="btn">ADD TO CART</button></div></div>
    </div>
  );
};
export default Prod_cart;