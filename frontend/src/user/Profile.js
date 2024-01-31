import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FollowProfileButton from "./FollowProfileButton";
import auth from "../auth/auth-helper";
import { useNavigate } from "react-router-dom";
import { chackIfFollowing, getUserById } from "./api-user";
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
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    getUserById({ userId: userId }, jwt.token).then((result) => {
      if (result && result.error) {
        setRedirectToSignin(true);
      } else {
        setUser(result.data);
      }
    });

    if (auth.isAuthenticated().user.id !== parseInt(userId)) {
      chackIfFollowing(userId, jwt.token).then((result) => {
        if (result.error) {
          console.log(result.error);
        } else {
          setFollowing(result.data.isFollowing);
        }
      });
    }
  }, [userId, jwt.token]);

  const clickFollowButton = (callApi) => {
    callApi(userId, { t: jwt.token }).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setFollowing((prevState) => !prevState);
      }
    });
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
            primary={user?.firstName + " " + user?.lastName}
            secondary={user?.email}
          />
          {auth.isAuthenticated().user.id !== parseInt(userId) && (
            <FollowProfileButton
              following={following}
              onButtonClick={clickFollowButton}
            />
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={user?.username}
            secondary={"Joined: " + new Date(user?.createdAt).toDateString()}
          />
        </ListItem>
        <ProfileTabs user={user} />
      </List>
    </Paper>
  );
}
