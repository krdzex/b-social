import React from "react";
import { Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import seashell from "./../assets/images/seashell.jpg"

const Home = () => {
  const theme = useTheme();
  
  const classes = {
    card: {
      maxWidth: 600,
      margin: "auto",
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    title: {
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
      color: theme.palette.text.secondary,
    },
    media: { minHeight: 330 },
  };

  return (
    <div>
      <Card sx={classes.card}>
        <Typography variant="h5" component="h2" sx={classes.title}>
          Home Page
        </Typography>
        <CardMedia
          sx={classes.media}
          image={seashell}
          title="Unicorn Shells"
        />
        <CardContent>
          <Typography variant="body1" component="p">
            Welcome to the bSocial home page
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
