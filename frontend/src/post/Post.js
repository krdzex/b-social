import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { getComments } from "./api-post";
import authHelper from "../auth/auth-helper";

const Post = (props) => {
  const jwt = authHelper.isAuthenticated();
  const [viewComments, setViewComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments({ t: jwt.token }, props.post.id).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setComments(result.data);
      }
    });
  }, [props.post.id]);

  const removeComment = (idToRemove) => {
    setComments(comments.filter((comment) => comment.id !== idToRemove));
  };

  const addComment = (comment) => {
    const updatedComments = [...comments];
    updatedComments.unshift(comment);
    setComments(updatedComments);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={
          <>
            <Link to={"/user/" + props.post.user.id}>
              {props.post.user.firstName + " " + props.post.user.lastName}
            </Link>
            ({props.post.user.username})
          </>
        }
        subheader={"Posted: " + new Date(props.post.createdAt).toDateString()}
      />
      <CardContent>
        <Typography component="p">{props.post.text}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="Comment"
          color="secondary"
          onClick={() => setViewComments((value) => !value)}
        >
          <CommentIcon />
        </IconButton>
        <span>{props.post._count.comments}</span>
      </CardActions>
      {viewComments && (
        <Comments
          postId={props.post.id}
          comments={comments}
          removeComment={removeComment}
          addComment={addComment}
        />
      )}
    </Card>
  );
};

export default Post;
