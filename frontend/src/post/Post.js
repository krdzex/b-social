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
    console.log(props)
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
        <IconButton aria-label="Comment" color="secondary">
          <CommentIcon />
        </IconButton>
        <span>{props.post._count.comments}</span>
      </CardActions>
    </Card>
  );
};

export default Post;
