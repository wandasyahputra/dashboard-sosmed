import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Users } from "pages/users";
import { Post } from "pages/post";
import { Alert } from "components/alert";

const Routes = () => (
  <Router>
    <Alert />
    <Switch>
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:userId/post" component={Post} />
      <Redirect to="/users" />
    </Switch>
  </Router>
);

export default Routes;
