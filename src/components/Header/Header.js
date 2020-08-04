import React, { Component } from 'react';

//custom styling imports
import { withStyles, createStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

//material-ui components

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const customStyles = (theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: 'left',
      margin: `0 0 30px`,
      position: 'static',
      background: 'black',
    },
    title: { flexGrow: 2 },
    primaryHeading: {
      display: 'inline-block',
      marginRight: '0.8rem',
    },
    backButton: {
      fill: 'white',
    },
  });

class Header extends Component {
  render() {
    const { classes } = this.props;
    let backArrowContent = null;

    if (this.props.backHandler != null) {
      backArrowContent = (
        <IconButton
          className={classes.backButton}
          onClick={this.props.backHandler}
        >
          <ArrowBackIos fontSize='large' />
        </IconButton>
      );
    }
    return (
      <div className={classes.root}>
        <AppBar className={classes.root}>
          <Toolbar>
            {/* <IconButton></IconButton> */}
            {/* <IconButton
              className={classes.backButton}
              onClick={this.props.backHandler}
            >
              <ArrowBackIos fontSize='large' />
            </IconButton> */}
            {backArrowContent}
            <Typography
              variant='h4'
              component='h1'
              className={classes.primaryHeading}
              color='inherit'
            >
              {this.props.title}
            </Typography>
            <div>{this.props.children}</div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(customStyles)(Header);
