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
      <Route exact path="/users" component={Users} />
      <Redirect to="/users" />
    </Switch>
  </Router>
);

export default Routes;
