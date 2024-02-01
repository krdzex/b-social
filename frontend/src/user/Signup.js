import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { create } from "./api-user";

export default function Signup() {
  const theme = useTheme();

  const classes = {
    card: {
      maxWidth: 600,
      margin: "auto",
      textAlign: "center",
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
    },
    error: {
      verticalAlign: "middle",
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    submit: {
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
  };

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (values.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (values.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (values.username.trim() === "") {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (values.email.trim() === "") {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (values.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (
      values.confirmPassword.trim() === "" ||
      values.confirmPassword !== values.password
    ) {
      newErrors.confirmPassword = "Passwords must match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clickSubmit = () => {
    if (validateForm()) {
      const user = {
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        username: values.username || undefined,
        email: values.email || undefined,
        password: values.password || undefined,
        confirmPassword: values.confirmPassword || undefined,
      };

      create(user).then((data) => {
        if (data.error) setValues({ ...values, error: data.msg });
        else setValues({ ...values, error: "", open: true });
      });
    }
  };

  return (
    <div>
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Sign Up
          </Typography>
          <TextField
            id="firstName"
            label="First Name"
            sx={classes.textField}
            value={values.firstName}
            onChange={handleChange("firstName")}
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <br />
          <TextField
            id="lastName"
            label="Last Name"
            sx={classes.textField}
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <br />
          <TextField
            id="username"
            label="Username"
            sx={classes.textField}
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
            error={!!errors.username}
            helperText={errors.username}
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            sx={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            sx={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Confirm password"
            sx={classes.textField}
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={clickSubmit}
            variant="contained"
            sx={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
