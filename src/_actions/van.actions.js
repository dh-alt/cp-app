import {vanConstants} from '../_constants';
import {vanService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const vanActions = {
  add,
  getAll,
  delete: _delete,
  edit,
};

function add(van) {
  return (dispatch) => {
    dispatch(request(van));

    vanService.create(van)
        .then(
            (van) => {
              dispatch(success(van));
              history.push('/vans');
            },
            (error) => {
              dispatch(failure(error.toString()));
              dispatch(alertActions.error(error.toString()));
            },
        );
  };

  function request(van) {
    return {type: vanConstants.ADD_REQUEST, van};
  }
  function success(van) {
    return {type: vanConstants.ADD_SUCCESS, van};
  }
  function failure(error) {
    return {type: vanConstants.ADD_FAILURE, error};
  }
}

function edit(van) {
  return (dispatch) => {
    dispatch(request(van));

    vanService.update(van)
        .then(
            (van) => {
              dispatch(success(van));
              history.push('/vans');
              dispatch(alertActions.success('van edited successfully.'));
            },
            (error) => {
              dispatch(failure(error.toString()));
              dispatch(alertActions.error(error.toString()));
            },
        );
  };

  function request(van) {
    return {type: vanConstants.EDIT_REQUEST, van};
  }
  function success(van) {
    return {type: vanConstants.EDIT_SUCCESS, van};
  }
  function failure(error) {
    return {type: vanConstants.EDIT_FAILURE, error};
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    vanService.getAll()
        .then(
            (vans) => dispatch(success(vans)),
            (error) => dispatch(failure(error.toString())),
        );
  };

  function request() {
    return {type: vanConstants.GETALL_REQUEST};
  }
  function success(vans) {
    return {type: vanConstants.GETALL_SUCCESS, vans};
  }
  function failure(error) {
    return {type: vanConstants.GETALL_FAILURE, error};
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    vanService.delete(id)
        .then(
            (van) => dispatch(success(id)),
            (error) => dispatch(failure(id, error.toString())),
        );
  };

  function request(id) {
    return {type: vanConstants.DELETE_REQUEST, id};
  }
  function success(id) {
    return {type: vanConstants.DELETE_SUCCESS, id};
  }
  function failure(id, error) {
    return {type: vanConstants.DELETE_FAILURE, id, error};
  }
}
