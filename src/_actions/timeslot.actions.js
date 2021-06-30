import {timeslotConstants} from '../_constants';
import {timeslotService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const timeslotActions = {
  add,
  getAll,
  delete: _delete,
  edit,
};

function add(timeslot) {
  return (dispatch) => {
    dispatch(request(timeslot));

    timeslotService.create(timeslot)
        .then(
            (timeslot) => {
              dispatch(success(timeslot));
              history.push('/timeslots');
            },
            (error) => {
              dispatch(failure(error.toString()));
              dispatch(alertActions.error(error.toString()));
            },
        );
  };

  function request(timeslot) {
    return {type: timeslotConstants.ADD_REQUEST, timeslot};
  }
  function success(timeslot) {
    return {type: timeslotConstants.ADD_SUCCESS, timeslot};
  }
  function failure(error) {
    return {type: timeslotConstants.ADD_FAILURE, error};
  }
}

function edit(timeslot) {
  return (dispatch) => {
    dispatch(request(timeslot));

    timeslotService.update(timeslot)
        .then(
            (timeslot) => {
              dispatch(success(timeslot));
              history.push('/timeslots');
              dispatch(alertActions.success('timeslot edited successfully.'));
            },
            (error) => {
              dispatch(failure(error.toString()));
              dispatch(alertActions.error(error.toString()));
            },
        );
  };

  function request(timeslot) {
    return {type: timeslotConstants.EDIT_REQUEST, timeslot};
  }
  function success(timeslot) {
    return {type: timeslotConstants.EDIT_SUCCESS, timeslot};
  }
  function failure(error) {
    return {type: timeslotConstants.EDIT_FAILURE, error};
  }
}

function getAll(filters) {
  return (dispatch) => {
    dispatch(request());

    timeslotService.getAll(filters)
        .then(
            (timeslots) => dispatch(success(timeslots)),
            (error) => dispatch(failure(error.toString())),
        );
  };

  function request() {
    return {type: timeslotConstants.GETALL_REQUEST};
  }
  function success(timeslots) {
    return {type: timeslotConstants.GETALL_SUCCESS, timeslots};
  }
  function failure(error) {
    return {type: timeslotConstants.GETALL_FAILURE, error};
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    timeslotService.delete(id)
        .then(
            (timeslot) => dispatch(success(id)),
            (error) => dispatch(failure(id, error.toString())),
        );
  };

  function request(id) {
    return {type: timeslotConstants.DELETE_REQUEST, id};
  }
  function success(id) {
    return {type: timeslotConstants.DELETE_SUCCESS, id};
  }
  function failure(id, error) {
    return {type: timeslotConstants.DELETE_FAILURE, id, error};
  }
}
