import { useEffect, useState } from "react";
import authHelper from "../auth/auth-helper";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const FindPeople = () => {
  const jwt = authHelper.isAuthenticated();

  const [values, setValues] = useState({
    users: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Emily Johnson" },
      { id: 4, name: "Michael Brown" },
    ],
  });

  const clickFollow = (user, index) => {
    // follow({ userId: jwt.user._id }, { t: jwt.token }, user._id)
    //     .then((data) => {
    //         if (data.error) { console.log(data.error) }
    //         else {
    //             let toFollow = values.users
    //             toFollow.splice(index, 1)
    //             setValues({ ...values, users: toFollow, open: true, followMessage: `Following ${user.name}` })
    //         }
    //     })
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // findPeople({
    //     userId: jwt.user._id
    // }, {
    //     t: jwt.token
    // }, signal).then((data) => {
    //     if (data && data.error) {
    //         console.log(error)
    //     } else {
    //         setValues({ ...values, users: data })
    //     }
    // })
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const handleRequestClose = () => {
    setValues({ ...values, open: false });
  };
  return (
    <List>
      {values.users.map((item, i) => {
        return (
          <span key={i}>
            <ListItem>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <Link to={"/user/" + item.id}>
                  <IconButton aria-label="Edit" color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </Link>
                <Button
                  aria-label="Follow"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    clickFollow(item, i);
                  }}
                >
                  Follow
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </span>
        );
      })}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span>{values.followMessage}</span>}
      />
    </List>
  );
};

export default FindPeople;
