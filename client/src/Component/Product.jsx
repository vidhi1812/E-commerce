import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Assets/css/product.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
axios.defaults.withCredentials = true;
const Product = () => {
  const navigate = useNavigate();
  const { user, isUserLoggedIn } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/auth/product?page=${currentPage}`,
          { withCredentials: true }
        );
        if (res.status === 200) {
          setProduct(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, [currentPage]);
  const addcart = async (id) => {
    if (!isUserLoggedIn) {
      return toast.error("please login first"), navigate("/login");
    }
    try {
      const res = await axios.patch(
        `http://localhost:9000/api/auth/product/${id}`,
        {
          withCredentials: true,
        }
      );
      if(res.status === 200){
        toast.success("Product add")
      }
    } catch (err) {
      if(err.response.status === 302){
        toast.error("Product already exists in the cart")
      }
      else{
        toast.error("Product does not exist")
      }
    }
  };
  return (
    <div className="Product-section">
      <div className="heading">
        {isUserLoggedIn ? (
          <h1>Welcome {user.username}</h1>
        ) : (
          <h1>Welcome Guest</h1>
        )}
      </div>
      <div className="productlist">
        {product.map((item) => (
          <div key={item._id}>
            <div className="prodcart1">
              <div className="prodct6">
                <img className="pro5" src={item.image_url} alt="product" />
              </div>
              <div className="pro_cart5443">
                <div className="prort56">{item.name}</div>
                <div className="prod47">{item.price}</div>
              </div>
              <div className="pro_ct56">{item.description}</div>
              <div className="pryu2">
                <div className="prod_prop">{item.category}</div>
                <div className="prod_btn">
                  <button className="btn" onClick={() => addcart(item._id)}>
                    ADD TO CART <AddShoppingCartIcon/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="page">
        <Stack spacing={2}>
          <Pagination
            count={9}
            size="small"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};
export default Product;