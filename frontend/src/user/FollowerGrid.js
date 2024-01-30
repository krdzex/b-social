import { useState } from "react";
import BaseFollowGrid from "./BaseFollowGrid";

export default function FollowerGrid() {
  const [followerPeople, setFollowerPeople] = useState([]);

  return <BaseFollowGrid people={followerPeople} />;
}
