import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../store/store";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
axios.defaults.withCredentials = true;
const Product = () => {
  const { user, isUserLoggedIn } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/api/auth/product?page=${currentPage}`,{withCredentials: true,}
        );
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  
  },[currentPage]);
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
            
           
          </div>
        ))}
        </div>
      <div>
        <Stack spacing={2}>
          <Pagination
            count={7}
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
