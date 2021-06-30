import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const HomePage = (props) => {
  useEffect(() => {
    document.title = 'CP-HomePage';
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => props.EditUser(id);
  }
  const classes = useStyles();
  const {user, users} = props;
  console.log(`props ${JSON.stringify(props.user.user)}`);
  return (
    <div className="col-md-6 col-md-offset-3">
      <h3>Welcome to CA App </h3>
      <p>TODO: Use translations</p>
      <p>TODO: Authorization</p>
      <p>TODO: Edit my profile</p>
      <p>TODO: Change password</p>
    </div>
  );
}

function mapState(state) {
  const {authentication} = state;
  const user = authentication.user;
  return {user};
}

const actionCreators = {
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
