import { useEffect, useState } from "react";
import authHelper from "../auth/auth-helper";
import { Card, Divider, Typography } from "@mui/material";
import NewPost from "./NewPost";
import { useParams } from "react-router";
import PostList from "./PostList";
import { listNewsFeed } from "./api-post";

const NewsFeed = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([
    {
      id: "1",
      text: "This is the first post",
      user: {
        _id: "11",
        name: "John Doe",
      },
      createdAt: new Date("2024-01-29T12:00:00Z"),
    },
    {
      iid: "2",
      text: "This is the second post",
      user: {
        id: "user2",
        name: "Jane Smith",
      },
      createdAt: new Date("2024-01-28T15:30:00Z"),
    },
  ]);

  const jwt = authHelper.isAuthenticated();

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  useEffect(() => {
    const aborController = new AbortController();
    const signal = aborController.signal;

    listNewsFeed(userId, { t: jwt.token }, signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });

    return function cleanup() {
      aborController.abort();
    };
  }, [userId]);
  return (
    <Card>
      <Typography type="title">NewsFeed</Typography>
      <Divider />
      <NewPost addUpdate={addPost} />
      <Divider />
      <PostList posts={posts} />
    </Card>
  );
};

export default NewsFeed;
