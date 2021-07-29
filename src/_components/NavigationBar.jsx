import React, { useState, useCallback } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { primaryColor, secondaryColor } from "./main-style.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  brand: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: primaryColor,
  },
  navbar: {
    backgroundColor: "transparent",
    color: secondaryColor,
    boxShadow: "none",
  }
}));

export const NavBar = (props) => {
    const history = useHistory();  
  const classes = useStyles();
  const [auth, setAuth] = useState(!!props.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [state, setState] = React.useState({
    left: false,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (to) => {
    setAnchorEl(null);
    history.push(to);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const anchor = 'left'
  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {auth && props.user && (
                <div>
                    <ListItem button key={'users'} component={Link} to="/users">
                        <ListItemText primary={'Users'} />
                    </ListItem>
                    <ListItem button key={'orders'} component={Link} to="/users">
                        <ListItemText primary={'Orders'} />
                    </ListItem>
                    <ListItem button key={'vans'} component={Link} to="/vans">
                        <ListItemText primary={'Vans'} />
                    </ListItem>
                    <ListItem button key={'slots'} component={Link} to="/timeslots">
                        <ListItemText primary={'Timeslots'} />
                    </ListItem>
                    <ListItem button key={'myorders'} component={Link} to="/users">
                        <ListItemText primary={'My Orders'} />
                    </ListItem>
                    <ListItem button key={'mycars'} component={Link} to="/users">
                        <ListItemText primary={'My Cars'} />
                    </ListItem>
                </div>
          )
      }  
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          {auth && props.user && (
          <IconButton onClick={toggleDrawer(anchor, true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          )}
          <a href="/" className={classes.brand}>CP APP</a>
          {
            !props.user && (
              <Button color="inherit" href="/login">Login</Button>
            )
          }
          {auth && props.user && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <Avatar className={classes.avatar}>{props.user.firstname[0].toUpperCase()}{props.user.lastname[0].toUpperCase()}</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose('/')}>{'Profile'}</MenuItem>
                <MenuItem onClick={() => handleClose('/')}>{'My account'}</MenuItem>
                <MenuItem onClick={() => handleClose('/login')}>{'Logout'}</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
        </Drawer>
    </div>
  );
}

function mapState(state) {
    const {user} = state.authentication;
    return {user: !!user ? user.user : null};
}
  
const actionCreators = {
};
  
const connectedNavBar = connect(mapState, actionCreators)(NavBar);
export {connectedNavBar as NavigationBar};
