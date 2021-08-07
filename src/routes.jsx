import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Users } from "pages/users";

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/user" component={Users} />
      <Redirect to="/user" />
    </Switch>
  </Router>
);

export default Routes;
