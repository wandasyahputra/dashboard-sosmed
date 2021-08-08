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
import { PostDetail } from "pages/post-detail";
import { Album } from "pages/album";
import { Photo } from "pages/photo";

const Routes = () => (
  <Router>
    <Alert />
    <Switch>
      <Route exact path="/users" component={Users} />
      <Route exact path="/users/:userId/post" component={Post} />
      <Route exact path="/users/:userId/post/:postId" component={PostDetail} />
      <Route exact path="/users/:userId/album" component={Album} />
      <Route exact path="/users/:userId/album/:albumId" component={Photo} />
      <Redirect to="/users" />
    </Switch>
  </Router>
);

export default Routes;
