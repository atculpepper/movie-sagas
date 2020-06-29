import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core";

//material-ui components

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const customStyles = (theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "left",
      margin: `0 0 30px`,
    },
    title: { flexGrow: 2 },
    primaryHeading: {
      display: "inline-block",
      marginRight: "0.8rem",
    },
  });

class Header extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography>Movie Database</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(customStyles)(Header);
