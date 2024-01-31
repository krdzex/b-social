import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getAllUsers } from "./api-user";
import authHelper from "../auth/auth-helper";

const Users = () => {
  const jwt = authHelper.isAuthenticated();

  const theme = useTheme();

  const classes = {
    root: {
      padding: theme.spacing(1),
      margin: theme.spacing(5),
    },
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle,
    },
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(jwt.token).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setUsers(result.data);
      }
    });
  }, [jwt.token]);

  return (
    <div>
      <Paper sx={classes.root} elevation={4}>
        <Typography variant="h6" sx={classes.title}>
          All users
        </Typography>
        <List dense>
          {users.map((item, i) => {
            return (
              <Link to={"/user/" + item.id} key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      item.firstName +
                      " " +
                      item.lastName +
                      " - " +
                      item.username
                    }
                    secondary={"Email: " + item.email}
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForwardIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    </div>
  );
};

export default Users;
