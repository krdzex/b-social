import { useEffect, useState } from "react";
import authHelper from "../auth/auth-helper";
import { Card, Divider, Typography } from "@mui/material";
import NewPost from "./NewPost";
import { useParams } from "react-router";

const NewsFeed = () => {
    let params = useParams()
    const [posts, setPosts] = useState([])
    const jwt = authHelper.isAuthenticated();

    const addPost = (post) => {
        const updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
    }

    useEffect(() => {
        const aborController = new AbortController()
        const signal = aborController.signal

        // listNewsFeed({ userId: params.userId}, { t: jwt.token }, signal)
        //     .then((data) => {
        //         if (data.error) {
        //             console.log(data.error)
        //         } else {
        //             setPosts(data)
        //         }
        //     })

        return function cleanup() { aborController.abort() }
    }, [params.userId])
    return (
        <Card>
            <Typography type="title">NewsFeed</Typography>
            <Divider />
            <NewPost addUpdate={addPost} />
            <Divider />
            {/* <PostList removeUpdate={removePost} posts={posts} /> */}
        </Card>
    );
};

export default NewsFeed;