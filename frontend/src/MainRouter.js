import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./user/Signup";
import Menu from "./core/Menu";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import authHelper from "./auth/auth-helper";
import PrivateRoute from "./auth/PrivateRoute";

class MainRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user/:userId" element={<Profile />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route
            path="/"
            element={
              <Navigate
                to={
                  !authHelper.isAuthenticated()
                    ? "/signin"
                    : `/user/${authHelper.isAuthenticated().user.id}`
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default MainRouter;
