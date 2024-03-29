import { useState } from "react";
import authHelper from "../auth/auth-helper";
import { Link } from "react-router-dom";
import { Avatar, Card, CardHeader, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { comment, deleteComment } from "./api-post";

const classes = {
  commentField: {
    width: "100%",
  },
};

const Comments = (props) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const jwt = authHelper.isAuthenticated();

  const addComment = (event) => {
    if (event.keyCode === 13 && event.target.value) {
      event.preventDefault();

      if (text.length === 0) {
        setError("Text is required");
        return;
      }
      var commentToAdd = {
        text: text,
      };
      comment(jwt.token, props.postId, commentToAdd).then((result) => {
        if (result.error) {
          console.log(result.error);
        } else {
          setText("");
          props.addComment(result.data);
        }
      });
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const deleteCommentClick = (comment) => (event) => {
    deleteComment(jwt.token, comment.id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        props.removeComment(comment.id);
      }
    });
  };

  const commentBody = (item) => {
    return (
      <p className={classes.commentText}>
        <>
          <Link to={"/user/" + item.author.id}>
            {item.author.firstName + " " + item.author.lastName}
          </Link>
          ({item.author.username})
        </>
        <br />
        {item.text}
        <br />
        <span className={classes.commentDate}>
          {new Date(item.createdAt).toDateString()} |
          {authHelper.isAuthenticated().user.id === item.author.id && (
            <IconButton
              onClick={deleteCommentClick(item)}
              className={classes.button}
              aria-label="Like"
            >
              <DeleteIcon style={{ color: "blue" }} />
            </IconButton>
          )}
        </span>
      </p>
    );
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={
          <TextField
            onKeyDown={addComment}
            multiline
            value={text}
            onChange={onChange}
            placeholder="Write something..."
            sx={classes.commentField}
            margin="normal"
            error={error !== null}
            helperText={error !== null ? error : ""}
          />
        }
        className={classes.cardHeader}
      />
      {props.comments.map((item, i) => {
        return (
          <CardHeader
            avatar={<Avatar />}
            title={commentBody(item)}
            className={classes.cardHeader}
            key={i}
          />
        );
      })}
    </Card>
  );
};

export default Comments;
