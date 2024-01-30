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

const Users = () => {
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
  const [users, setUsers] = useState([
    {
      id: 10,
      firstName: "Krsto",
      lastName: "Kostic",
    },
    {
      id: 10,
      firstName: "Krsto",
      lastName: "Kostic",
    },
    {
      id: 10,
      firstName: "Krsto",
      lastName: "Kostic",
    },
    {
      id: 10,
      firstName: "Krsto",
      lastName: "Kostic",
    },
  ]);

  useEffect(() => {
    // list().then((data) => {
    //   if (data && data.error) {
    //     console.log(data.error);
    //   } else {
    //     setUsers(data);
    //   }
    // });
  }, []);
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
                    primary={item.firstName + " " + item.lastName}
                    secondary={"Username: test"}
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
