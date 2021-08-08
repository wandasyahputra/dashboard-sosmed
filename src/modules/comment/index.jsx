import React, { useEffect } from "react";
import {
  setPostDetailUser,
  fetchUser,
  selectStatus,
  selectValidUntil,
  selectPostUser,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "modules/users/reducer";
import { Col } from "react-bootstrap";
import Title from "components/title";

export const PostDetailModule = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser(userId));
  const postUser = useSelector(selectPostUser);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  const fetchData = () => {
    dispatch(fetchPostDetail());
  };

  useEffect(() => {
    if (user) {
      dispatch(setPostDetailUser(user));
    } else {
      dispatch(fetchUser(userId));
    }
    if (validUntil < Date.now()) {
      dispatch(fetchPostDetail(postId));
    }
    if (deleteStatus === "success") {
      setDeleteData(null);
      showAlert("Success", "Post deleted succesfully");
      dispatch(setDeleteStatus());
    }
  }, [dispatch, validUntil, user, userId, deleteStatus]);

  useEffect(() => {
    if (validUntil < Date.now()) {
      dispatch(fetchUsers());
    }
  }, [dispatch, validUntil]);

  return (
    <React.Fragment>
      <Col md={6}>Created by {postUser.name}</Col>
      <Title title="title" />
    </React.Fragment>
  );
};
