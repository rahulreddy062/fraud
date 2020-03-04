import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Container
} from '@material-ui/core';

import img from './fraud-detection-512.png';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  }
}));

const Header = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);
  let logoutHandler = () => {
    sessionStorage.removeItem('token');
  };

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      style={{ backgroundColor: '#1976D3' }}>
      <Toolbar>
        <RouterLink to='/dashboard'>
          <img
            style={{ width: '12%', height: '12%', float: 'left' }}
            alt='Logo'
            src={img}
          />
        </RouterLink>
          <IconButton color='inherit'>
            <Badge
              badgeContent={notifications.length}
              color='primary'
              variant='dot'></Badge>
          </IconButton>

          <Button onClick={logoutHandler} color='inherit' style={{float: 'right'}}>
            Logout
          </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
