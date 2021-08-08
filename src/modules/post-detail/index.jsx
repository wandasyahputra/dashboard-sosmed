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
import ErrorPage from "components/error-page";
import Title from "components/title";
import { Col } from "react-bootstrap";
import { AsyncButton } from "components/button";

export const PostDetailModule = (props) => {
  const { userId, postId } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser(userId));
  const postUser = useSelector(selectPostUser);
  const postData = useSelector(selectData);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  const fetchPost = () => {
    dispatch(fetchPostDetail(postId));
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (user) {
      dispatch(setPostDetailUser(user));
    } else {
      dispatch(fetchUser(userId));
    }
    if (validUntil < Date.now() || (postData && postData.id !== postId)) {
      dispatch(fetchPostDetail(postId));
    }
  }, [dispatch, validUntil, user, userId, postId, postData]);

  return (
    <React.Fragment>
      {loadStatus === "idle" && (
        <>
          <Col xs={11}>
            <Title title={postData.title} />
          </Col>
          <Col xs={1}>
            <AsyncButton className="mt-4" onClick={goBack}>
              Close
            </AsyncButton>
          </Col>
          <div className="mb-4">Created by {postUser && postUser.name}</div>
          <p>{postData.body}</p>
        </>
      )}
      {loadStatus === "loading" && (
        <div>
          <div
            className="shine shine-line mt-4 mb-3 w-75"
            style={{ height: 30 }}
          ></div>
          <div className="shine shine-line mb-4 w-25"></div>
          <div className="shine shine-line mb-2"></div>
          <div className="shine shine-line mb-2"></div>
          <div className="shine shine-line mb-2"></div>
        </div>
      )}
      {loadStatus === "error" && <ErrorPage reFetch={fetchPost} />}
    </React.Fragment>
  );
};
