import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import Toolbar from '@material-ui/core/Toolbar';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaperOpen: {
    background: "#00D096",
    width: "100%",
    marginTop: 56,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
      width: drawerWidth,
    },
  },
  drawerPaperClose: {
    background: "#00D096",
    width: 56,
    marginTop: 56,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginTop: 64,
    },
  },
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
}));

const SideDrawer = ({ open }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: open ? classes.drawerPaperOpen : classes.drawerPaperClose,
      }}
    >
      {/* <Toolbar /> */}
      <div className={classes.drawerContainer}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} style={{ overflow: "hidden" }} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};
export default SideDrawer;
