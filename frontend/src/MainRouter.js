import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signin from "./user/Signin";
import Profile from "./user/Profile";

class MainRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default MainRouter;
