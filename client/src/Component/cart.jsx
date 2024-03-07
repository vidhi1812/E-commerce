import React, { useState, useEffect } from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "../Assets/css/cart.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
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
    if (!isUserLoggedIn) {
      return toast.error("please login first"), navigate("/login");
    }
    try {
      const res = await axios.delete(
        `http://localhost:9000/api/auth/cart/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success("Product remove");
        getCart();
      } else {
        toast.error("try again");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const handleqty = async (id, quantity) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: quantity,
            totalprice: item.price * quantity,
          };
        }
        return item;
      });
      setCart(updatedCart);
    } catch (err) {
      console.log(err);
    }
  };
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
              <div> {!item.totalprice ? item.price : item.totalprice}</div>
            </div>
            <div className="bgyt">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "10ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id={`outlined-select-quantity-${item._id}`}
                    select
                    label="Qty"
                    size="small"
                    onChange={(e) => handleqty(item._id, e.target.value)}
                    value={item.quantity}
                    defaultValue={1}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </Box>
              <button className="btncd" onClick={() => deletecart(item._id)}>
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
