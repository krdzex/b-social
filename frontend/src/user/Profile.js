import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FollowProfileButton from "./FollowProfileButton";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import { getUserById } from "./api-user";
import ProfileTabs from "./ProfileTabs";

export default function Profile() {
  const { userId } = useParams();

  const navigate = useNavigate();

  const theme = useTheme();

  const classes = {
    root: {
      maxWidth: 600,
      margin: "auto",
      padding: theme.spacing(3),
      marginTop: theme.spacing(5),
    },
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle,
    },
  };

  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [values, setValues] = useState({
    user: {},
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    getUserById({ userId: userId }, jwt.token).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setValues({ user: data.data });
      }
    });
  }, [userId]);

  const clickFollowButton = (callApi) => {
    // callApi({ userId: jwt.user.id }, { t: jwt.token }, values.user._id).then(
    //   (data) => {
    //     if (data.error) {
    //       setValues({ ...values, error: data.error });
    //     } else {
    //       setValues({ ...values, user: data, following: !values.following });
    //     }
    //   }
    // );
  };

  if (redirectToSignin) {
    navigate("/signin");
    return null;
  }
  return (
    <Paper sx={classes.root} elevation={4}>
      <Typography variant="h6" sx={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={values.user?.firstName + " " + values.user?.lastName}
            secondary={values.user?.email}
          />
          {auth.isAuthenticated().user &&
          auth.isAuthenticated().user.id === values.user?.id ? (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + values.user?.id}>
                <IconButton aria-label="Edit" color="primary">
                  {/* <Edit /> */}
                </IconButton>
              </Link>
            </ListItemSecondaryAction>
          ) : (
            <FollowProfileButton
              following={values.following}
              onButtonClick={clickFollowButton}
            />
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={values.user?.username}
            secondary={
              "Joined: " + new Date(values.user?.createdAt).toDateString()
            }
          />
        </ListItem>
        <ProfileTabs values={values} />
      </List>
    </Paper>
  );
}
