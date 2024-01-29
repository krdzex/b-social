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

const Post = (props) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={
          <Link to={"/user/" + props.post.user.id}>
            {props.post.user.name}
          </Link>
        }
        subheader={new Date(props.post.createdAt).toDateString()}
      />
      <CardContent>
        <Typography component="p">{props.post.text}</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Comment" color="secondary">
          <CommentIcon />
        </IconButton>
        <span>5</span>
      </CardActions>
    </Card>
  );
};

export default Post;
