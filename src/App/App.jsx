import React from 'react';
import {Router, Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';
import {PrivateRoute, NavigationBar} from '../_components';
import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {UsersPage} from '../UsersPage';
import {UsersEditPage} from '../UsersEditPage';
import {ListVans, AddVanPage, EditVanPage} from '../Vans'
import {ListTimeslots, AddTimeslotPage, EditTimeslotPage} from '../Timeslots'
import {SlotSelectionPage} from '../Reservations'

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <Router history={history}>
              <NavigationBar />
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/users" component={UsersPage} />
                <PrivateRoute exact path="/users/:id/edit" component={UsersEditPage} />
                <PrivateRoute exact path="/vans" component={ListVans} />
                <PrivateRoute exact path="/vans/add" component={AddVanPage} />
                <PrivateRoute exact path="/vans/:id/edit" component={EditVanPage} />
                <PrivateRoute exact path="/timeslots" component={ListTimeslots} />
                <PrivateRoute exact path="/timeslots/add" component={AddTimeslotPage} />
                <PrivateRoute exact path="/timeslots/:id/edit" component={EditTimeslotPage} />
                <Route path="/step1" component={SlotSelectionPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const {alert} = state;
  return {alert};
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export {connectedApp as App};
