import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {vanActions} from '../_actions';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 100,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const VansPage = (props) => {
  useEffect(() => {
    props.getVans();
    document.title = 'CP-VansPage';
  }, []);

  const classes = useStyles();
  const {vans} = props;
  console.log(`props ${JSON.stringify(props.vans)}`);
  return (
    <div>  
    <div className="col-md-6 col-md-offset-3">
      <h3>Manage Vans</h3>
        {
              props.alert.message &&
                <MuiAlert elevation={6} variant="standard" severity={`${props.alert.type}`}>
                  {props.alert.message}
                </MuiAlert>
        }

      {vans.loading && <em>Loading vans...</em>}
      {vans.items &&
                  <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vans.items.length === 0 && <em><center>No vans found.</center></em>}
                      {vans.items.map((van, index) =>
                        <StyledTableRow key={van.id}>
                          <StyledTableCell component="th" scope="row">
                          <Link to={{
                            pathname: `/vans/${van.id}/edit`,
                            state: {...van}
                          }}>
                                {van.name}
                            </Link>
                          </StyledTableCell>
                          <StyledTableCell align="right">{van.status}</StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
            </Table>
          </TableContainer>
          }


    </div>
    <div className={classes.root}>
        <Link to='/vans/add'>
            <Fab color="primary" className={classes.fab} aria-label="add">
                <AddIcon />
            </Fab>    
        </Link>
    </div>
    </div>
  );
}

function mapState(state) {
  const {vans, alert} = state;
  return {vans, alert};
}

const actionCreators = {
  getVans: vanActions.getAll,
};

const connectedVansPage = connect(mapState, actionCreators)(VansPage);
export {connectedVansPage as ListVans};
