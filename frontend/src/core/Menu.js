import React from "react";
import auth from "./../auth/auth-helper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

const isActive = (location, path) =>
  location.pathname === path ? { color: "#ff4081" } : { color: "#ffffff" };

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const signout = () => {
    auth.signout();
    navigate("/signin");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          bSocial
        </Typography>
        {!auth.isAuthenticated() && (
          <span>
            <Link to={"/signup"}>
              <Button style={isActive(location, "/signup")}>Sign up</Button>
            </Link>
            <Link to={"/signin"}>
              <Button style={isActive(location, "/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to="/users">
              <Button style={isActive(location, "/users")}>Users</Button>
            </Link>
            <Link to={"/user/" + auth.isAuthenticated().user.id}>
              <Button
                style={isActive(
                  location,
                  "/user/" + auth.isAuthenticated().user.id
                )}
              >
                My Profile
              </Button>
            </Link>
            <Button color="inherit" onClick={signout}>
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
