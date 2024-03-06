import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
      else{
        toast.error("try again")
      }
    } catch (err) {}
  };
  return (
    <div className="Product-section">
      <div>
        {isUserLoggedIn ? (
          <h1>Welcome {user.username}</h1>
        ) : (
          <h1>Welcome Guest</h1>
        )}
      </div>
      <div>
        {product.map((item) => (
          <div key={item._id}>
            <div>
              <div>
                <img src={item.image_url} alt="product" />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
              </div>
              <div>{item.description}</div>
              <div>
                <div>{item.category}</div>
                <div>
                  <button className="btn" onClick={() => addcart(item._id)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Stack spacing={2}>
          <Pagination
            count={8}
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
