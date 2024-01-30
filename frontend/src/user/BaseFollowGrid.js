import { Avatar, ImageList, ImageListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function BaseFollowGrid(props) {
  return (
    <div>
      <ImageList rowHeight={160} cols={4}>
        {props.people.map((person, i) => {
          return (
            <ImageListItem style={{ height: 120 }} key={i}>
              <Link to={"/user/" + person.id}>
                <Avatar />
                <Typography>
                  {person.firstName + " " + person.lastName}
                </Typography>
              </Link>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}
BaseFollowGrid.propTypes = { people: PropTypes.array.isRequired };
