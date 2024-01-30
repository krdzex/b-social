import { useState } from "react";
import BaseFollowGrid from "./BaseFollowGrid";

export default function FollowingGrid() {
  const [followingPeople, setFollowingPeople] = useState([]);

  return <BaseFollowGrid people={followingPeople} />;
}
