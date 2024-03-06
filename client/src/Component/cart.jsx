import React, { useState, useEffect } from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "../Assets/css/cart.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";
axios.defaults.withCredentials = true;
const Cart = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, user } = useAuth();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (!isUserLoggedIn) navigate("/login");
  }, [isUserLoggedIn]);
  const getCart = async () => {
    if (!isUserLoggedIn) {
      return toast.error("please login first"), navigate("/login");
    }
    try {
      const res = await axios.get(`http://localhost:9000/api/auth/cart`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setCart(res.data);
      } else {
        toast.error("try again");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deletecart = async (id) => {
    if(!isUserLoggedIn){
      return toast.error("please login first"), navigate("/login");
    }
    try {
      const res = await axios.delete(`http://localhost:9000/api/auth/cart/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Product remove");
        getCart();
      } else {
        toast.error("try again");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="cart-section">
      <div className="heading">
        <h1>Welcome {user.username}</h1>
      </div>
      <div className="cart">
        {cart.map((item) => (
          <div className="remocdf" key={item._id}>
            <div>
              <img src={item.image_url} alt="" className="removecart" />
            </div>

            <div className="renkf">
              <div>{item.name}</div>
              <div> {item.price}</div>
            </div>
            <div className="bgyt">
              <button className="btncd" onClick={(()=>deletecart(item._id))}>
                <RemoveShoppingCartIcon />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Cart;
