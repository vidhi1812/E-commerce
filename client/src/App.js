import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Component/loginform";
import Signupform from "./Component/Signupform";
import Landing from "./Component/landing";
import Error from "./Component/error";
function App() {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<Landing/>}/>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<Signupform />} />
      <Route  path="*" element={<Error/>}/>
    </Routes>
    </>
  );
}

export default App;
