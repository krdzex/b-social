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

  const checkFollow = (user) => {
    const match = user.followers.some((follower) => {
      return follower._id == jwt.user._id;
    });
    return match;
  };
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [values, setValues] = useState({
    user: { following: [], followers: [] },
    following: false,
  });
  const jwt = auth.isAuthenticated();
  const photoUrl = values.user._id
    ? `http://localhost:4400/api/users/photo/${
        values.user._id
      }?${new Date().getTime()}`
    : `http://localhost:4400/api/defaultphoto`;
  useEffect(() => {
    // read({ userId: match.params.userId }, jwt.token).then((data) => {
    //   if (data && data.error) {
    //     setRedirectToSignin(true);
    //   } else {
    //     setValues({ ...values, user: data, following: checkFollow(data) });
    //   }
    // });
  }, [userId]);
  const clickFollowButton = (callApi) => {
    callApi({ userId: jwt.user._id }, { t: jwt.token }, values.user._id).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, user: data, following: !values.following });
        }
      }
    );
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
            <Avatar src={photoUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={values.user.name}
            secondary={values.user.email}
          />
          {auth.isAuthenticated().user &&
          auth.isAuthenticated().user._id === values.user._id ? (
            <ListItemSecondaryAction>
              <Link to={"/user/edit/" + values.user._id}>
                <IconButton aria-label="Edit" color="primary">
                  {/* <Edit /> */}
                </IconButton>
              </Link>
              {/* <DeleteUser userId={values.user._id} /> */}
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
            primary={values.user.about}
            secondary={
              "Joined: " + new Date(values.user.created).toDateString()
            }
          />
        </ListItem>
        {/* <ProfileTabs values={values} /> */}
      </List>
    </Paper>
  );
}
