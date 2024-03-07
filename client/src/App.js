import React from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import LoginForm from "./Component/loginform";
import Signupform from "./Component/Signupform";
import Error from "./Component/error";
import Logout from "./Component/logout";
import Product from "./Component/Product";
import Cart from "./Component/cart";
import Navbar from "./Component/navbar45";

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup", "/logout", "*"];
  const isNavbarHidden = hideNavbarPaths.some(path => location.pathname.includes(path));
  return (
    <>
      {!isNavbarHidden && <Navbar />}
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<Signupform />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route path="/" element={<Product />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
