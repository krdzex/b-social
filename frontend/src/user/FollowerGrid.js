import { useEffect, useState } from "react";
import BaseFollowGrid from "./BaseFollowGrid";
import authHelper from "../auth/auth-helper";
import { useParams } from "react-router";
import { getFollowers } from "./api-user";

export default function FollowerGrid() {
  const [followers, setFollowers] = useState([]);
  const jwt = authHelper.isAuthenticated();

  const { userId } = useParams();

  useEffect(() => {
    getFollowers(userId, jwt.token).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setFollowers(result.data);
      }
    });
  }, [userId, jwt.token]);

  return <BaseFollowGrid people={followers} />;
}
