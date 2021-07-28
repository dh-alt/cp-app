import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {timeslotActions} from '../_actions';

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

const TimeslotsPage = (props) => {
  useEffect(() => {
    props.getTimeslots();
    document.title = 'CP-TimeslotsPage';
  }, []);

  const classes = useStyles();
  const {timeslots} = props;
  console.log(`props ${JSON.stringify(props.timeslots)}`);
  return (
    <div>  
    <div className="col-md-6 col-md-offset-3">
      <h3>Manage Timeslots</h3>
        {
              props.alert.message &&
                <MuiAlert elevation={6} variant="standard" severity={`${props.alert.type}`}>
                  {props.alert.message}
                </MuiAlert>
        }

      {timeslots.loading && <em>Loading timeslots...</em>}
      {timeslots.items &&
                  <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timeslots.items.length === 0 && <em><center>No timeslots found.</center></em>}
                      {timeslots.items.map((timeslot, index) =>
                        <StyledTableRow key={timeslot.id}>
                          <StyledTableCell component="th" scope="row">
                          <Link to={{
                            pathname: `/timeslots/${timeslot.id}/edit`,
                            state: {...timeslot}
                          }}>
                                <p>{timeslot.address}</p>
                            </Link>
                            <em>
                                {dayjs.unix(timeslot.startTime).tz("America/Los_Angeles").format('ddd,MMM DD hh:mm A')}
                                &nbsp;to&nbsp;
                                {dayjs.unix(timeslot.endTime).tz("America/Los_Angeles").format('hh:mm A')}
                                </em>
                          </StyledTableCell>
                          <StyledTableCell align="right">{timeslot.sold ? 'Sold' : 'Open'}</StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
            </Table>
          </TableContainer>
          }


    </div>
    <div className={classes.root}>
        <Link to='/timeslots/add'>
            <Fab color="primary" className={classes.fab} aria-label="add">
                <AddIcon />
            </Fab>    
        </Link>
    </div>
    </div>
  );
}

function mapState(state) {
  const {timeslots, alert} = state;
  return {timeslots, alert};
}

const actionCreators = {
  getTimeslots: timeslotActions.getAll,
};

const connectedTimeslotsPage = connect(mapState, actionCreators)(TimeslotsPage);
export {connectedTimeslotsPage as ListTimeslots};
