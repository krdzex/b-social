import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Tab, Tabs } from "@mui/material";
import NewsFeed from "../post/NewsFeed";
import FollowingGrid from "./FollowingGrid.js";
import FollowerGrid from "./FollowerGrid.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ProfileTabs(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <NewsFeed />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FollowingGrid />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FollowerGrid />
      </TabPanel>
    </Box>
  );
}
