import config from '../config';
import {authHeader} from '../_helpers';

export const timeslotService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll(filters) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/timeslots`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/timeslots/${id}`, requestOptions)
  .then(handleResponse)
}

function create(timeslot) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(timeslot),
  };

  return fetch(`${config.apiUrl}/timeslots`, requestOptions)
  .then(handleResponse)
  .then((timeslot) => {
    // store timeslot details and jwt token in local storage to keep timeslot logged in between page refreshes
    localStorage.setItem('timeslot', JSON.stringify(timeslot));

    return timeslot;
  });
}

function update(timeslot) {
  const { id, ...attrs } = timeslot;
  const requestOptions = {
    method: 'PUT',
    headers: {...authHeader(), 'Content-Type': 'application/json'},
    body: JSON.stringify(attrs),
  };

  return fetch(`${config.apiUrl}/timeslots/${id}`, requestOptions).then(handleResponse); ;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/timeslots/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
