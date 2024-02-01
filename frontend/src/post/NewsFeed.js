import { useEffect, useState } from "react";
import authHelper from "../auth/auth-helper";
import { Card, Divider, Typography } from "@mui/material";
import NewPost from "./NewPost";
import { useParams } from "react-router";
import PostList from "./PostList";
import { listNewsFeed } from "./api-post";

const NewsFeed = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  const jwt = authHelper.isAuthenticated();

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  useEffect(() => {
    const aborController = new AbortController();
    const signal = aborController.signal;

    listNewsFeed(userId, jwt.token, signal).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setPosts(result.data);
      }
    });

    return function cleanup() {
      aborController.abort();
    };
  }, [userId, jwt.token]);

  const removePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const increaseCommentCount = (postId) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            _count: {
              ...post._count,
              comments: post._count.comments + 1,
            },
          };
        }
        return post;
      });
    });
  };

  const decreaseCommentCount = (postId) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            _count: {
              ...post._count,
              comments: post._count.comments - 1,
            },
          };
        }
        return post;
      });
    });
  };

  return (
    <Card>
      <Typography type="title">NewsFeed</Typography>
      <Divider />
      {authHelper.isAuthenticated().user.id === parseInt(userId) && (
        <>
          <NewPost addUpdate={addPost} />
          <Divider />
        </>
      )}
      <PostList
        posts={posts}
        removeUpdate={removePost}
        increaseCommentCount={increaseCommentCount}
        decreaseCommentCount={decreaseCommentCount}
      />
    </Card>
  );
};

export default NewsFeed;
