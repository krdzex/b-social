import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { signin } from "../auth/api-auth";

export default function Signin(props) {
  const theme = useTheme();
  const navigate = useNavigate();

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
    email: "",
    password: "",
    error: "",
  });

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const clickSubmit = () => {
    if (values.email.length === 0 || values.password.length === 0) {
      if (values.email.length === 0) {
        setEmailError("Email is required");
      }

      if (values.password.length === 0) {
        setPasswordError("Password is required");
      }
      return;
    }

    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    signin(user).then((data) => {
      setEmailError(null);
      setPasswordError(null);

      if (data.error) {
        setValues({ ...values, error: data.msg });
      } else {
        auth.authenticate(data.data, () => {
          setValues({ ...values });
        });
        navigate(`/user/${data.data.user.id}`);
      }
    });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Card sx={classes.card}>
        <CardContent>
          <Typography variant="h6" sx={classes.title}>
            Sign In
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            sx={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            error={emailError !== null}
            helperText={emailError !== null ? emailError : ""}
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
            error={passwordError !== null}
            helperText={passwordError !== null ? passwordError : ""}
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
            variant="contained"
            onClick={clickSubmit}
            sx={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
