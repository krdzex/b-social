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
import { useState } from "react";

const Post = (props) => {
  console.log(props);
  const [viewComments, setViewComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: "comment1",
      text: "This is the first comment",
      author: {
        id: "user1",
        firstName: "John",
        lastName: "Doe",
      },
      createdAt: new Date("2024-01-29T12:00:00Z"),
    },
    {
      _id: "comment2",
      text: "This is the second comment",
      author: {
        id: "user2",
        firstName: "Jane",
        lastName: "Smith",
      },
      createdAt: new Date("2024-01-28T15:30:00Z"),
    },
  ]);

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
      {viewComments && <Comments postId={props.post.id} comments={comments} />}
    </Card>
  );
};

export default Post;
