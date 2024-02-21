import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { changeAuth } from "../redux/AuthSlice";
const Routers = () => {
  const dispatch = useDispatch();
  const user = useSelector((data) => data.auth.auth)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(changeAuth(user))
    });
  },[]);

  return (
    <Routes>
      <Route exact path="/" element={user?<Home /> : <Login />} />
      <Route  path="/:id" element={<Home />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />

    </Routes>
  );
};

export default Routers;
