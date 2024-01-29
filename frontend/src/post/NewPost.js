import React, { useState } from "react";
import { create } from "./api-post";
import authHelper from "../auth/auth-helper";
import { Button, Card, TextField } from "@mui/material";

const NewPost = (props) => {
  const jwt = authHelper.isAuthenticated();
  const [text, setText] = useState("");
  const clickPost = () => {
    console.log(text);
    const post = {
      text: text || undefined,
    };
    create({ t: jwt.token }, post).then((result) => {
      console.log(result);
      if (result.error) {
        //   setValues({ ...values, error: data.error });
      } else {
        setText("");
        props.addUpdate(result.data);
      }
    });
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Card>
      <TextField
        label="Share your thoughts"
        multiline
        rows={5}
        fullWidth
        margin="normal"
        value={text}
        onChange={handleChange}
        // error={values.error !== undefined}
        // helperText={values.error ? "Text is required" : ""}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={clickPost}
        >
          Post
        </Button>
      </div>
    </Card>
  );
};

export default NewPost;
