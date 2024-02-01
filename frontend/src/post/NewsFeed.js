import { useEffect, useState } from "react";
import authHelper from "../auth/auth-helper";
import { Card, Divider, Pagination, Typography } from "@mui/material";
import NewPost from "./NewPost";
import { useParams } from "react-router";
import PostList from "./PostList";
import { listNewsFeed } from "./api-post";

const NewsFeed = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const jwt = authHelper.isAuthenticated();

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };

  useEffect(() => {
    listNewsFeed(userId, jwt.token, 1, 3).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setPosts(result.data.data);
        setMeta(result.data.meta);
      }
    });

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

  const handlePageChange = (event, page) => {
    listNewsFeed(userId, jwt.token, page, 3).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setPosts(result.data.data);
        setMeta(result.data.meta);
      }
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
      {meta && (
        <Pagination
          color="secondary"
          variant="outlined"
          count={meta.totalPages}
          page={meta.currentPage}
          onChange={handlePageChange}
          disabled={meta.totalPages <= 1}
        />
      )}
    </Card>
  );
};

export default NewsFeed;
