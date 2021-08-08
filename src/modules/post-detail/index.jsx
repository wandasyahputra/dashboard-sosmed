import React, { useEffect } from "react";
import {
  setPostDetailUser,
  fetchUser,
  selectStatus,
  selectValidUntil,
  selectData,
  selectPostUser,
  fetchPostDetail,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "modules/users/reducer";
import { Col } from "react-bootstrap";
import Title from "components/title";

export const PostDetailModule = (props) => {
  const { userId, postId } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser(userId));
  const postUser = useSelector(selectPostUser);
  const postData = useSelector(selectData);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  useEffect(() => {
    if (user) {
      dispatch(setPostDetailUser(user));
    } else {
      dispatch(fetchUser(userId));
    }
    if (validUntil < Date.now()) {
      dispatch(fetchPostDetail(postId));
    }
  }, [dispatch, validUntil, user, userId, postId]);

  return (
    <React.Fragment>
      <Title title={postData && postData.title} />
      <div className="mb-4">Created by {postUser.name}</div>
      <p>{postData && postData.body}</p>
    </React.Fragment>
  );
};
