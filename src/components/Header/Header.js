import React, { Component } from 'react';
import { withStyles, createStyles } from '@material-ui/core';

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
      background: '#0a0a0a',
    },
    title: { flexGrow: 2 },
    primaryHeading: {
      display: 'inline-block',
      marginRight: '0.8rem',
    },
  });

class Header extends Component {
  render() {
    const { classes } = this.props;
    let backArrowContent = null;

    if (this.props.backHandler != null) {
      backArrowContent = (
        <IconButton onClick={this.props.backHandler}>
          <ArrowBackIos fontSize='large' />
        </IconButton>
      );
    }
    return (
      <div className={classes.root}>
        <AppBar style={{ background: '#0a0a0a' }} className={classes.root}>
          <Toolbar>
            <Typography
              variant='h4'
              component='h1'
              className={classes.primaryHeading}
              color='inherit'
            >
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(customStyles)(Header);
