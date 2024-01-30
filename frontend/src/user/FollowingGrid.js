import { useEffect, useState } from "react";
import BaseFollowGrid from "./BaseFollowGrid";
import { getFollowingPeople } from "./api-user";
import { useParams } from "react-router";
import authHelper from "../auth/auth-helper";

export default function FollowingGrid() {
  const jwt = authHelper.isAuthenticated();

  const [followingPeople, setFollowingPeople] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getFollowingPeople(userId, { t: jwt.token }).then((result) => {
      if (result.error) {
        console.log(result.error);
      } else {
        setFollowingPeople(result.data);
      }
    });
  }, [userId]);

  return <BaseFollowGrid people={followingPeople} />;
}
