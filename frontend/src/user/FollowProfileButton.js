import React from "react";
import PropTypes from "prop-types";
// import { unfollow, follow } from './api-user';
import { Button } from "@mui/material";
import { follow } from "./api-user";

export default function FollowProfileButton(props) {
  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unfollowClick = () => {
    console.log("unfollow");
  };

  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
