import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Component/loginform";
import Signupform from "./Component/Signupform";

function App() {
  return (
    <>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<Signupform />} />
    </Routes>
    </>
  );
}

export default App;
