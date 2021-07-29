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
import MContainer from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';


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

const UsersPage = (props) => {
  useEffect(() => {
    props.getUsers();
    document.title = 'CP-UsersPage';
  }, []);

  const classes = useStyles();
  const {user, users} = props;
  console.log(`props ${JSON.stringify(props.user.user)}`);
  return (
    <MContainer component="main">
      <h3>Manage Users</h3>
        {
              props.alert.message &&
                <MuiAlert elevation={6} variant="standard" severity={`${props.alert.type}`}>
                  {props.alert.message}
                </MuiAlert>
        }

      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      {users.items &&
                  <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Role</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.items.map((user, index) =>
                        <StyledTableRow key={user.id}>
                          <StyledTableCell component="th" scope="row">
                          <Link to={{
                            pathname: `/users/${user.id}/edit`,
                            state: {...user}
                          }}>
                                {user.firstname + ' ' + user.lastname}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="right">{user.role}</StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
            </Table>
          </TableContainer>
          }
    </MContainer>
  );
}

function mapState(state) {
  const {users, authentication, alert} = state;
  const user = authentication.user;
  return {user, users, alert};
}

const actionCreators = {
  getUsers: userActions.getAll,
};

const connectedUsersPage = connect(mapState, actionCreators)(UsersPage);
export {connectedUsersPage as UsersPage};
