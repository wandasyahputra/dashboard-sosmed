import React, { useEffect, useState } from "react";
import {
  selectStatus,
  selectValidUntil,
  fetchComment,
  selectComment,
  setDeleteStatus,
  selectDeleteStatus,
  deleteComment,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "components/alert";
import { AsyncButton } from "components/button";
import { Col, Row } from "react-bootstrap";
import ErrorPage from "components/error-page";
import { ModalConfirmation } from "components/confirmation";

export const CommentModule = (props) => {
  const { postId } = props;
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState(null);
  const validUntil = useSelector(selectValidUntil);
  const comment = useSelector(selectComment);
  const status = useSelector(selectStatus);
  const deleteStatus = useSelector(selectDeleteStatus);

  const fetchData = () => {
    dispatch(fetchComment());
  };

  useEffect(() => {
    if (validUntil < Date.now()) {
      dispatch(fetchComment(postId));
    }
    if (deleteStatus === "success") {
      setDeleteData(null);
      showAlert("Success", "Comment deleted succesfully");
      dispatch(setDeleteStatus());
    }
  }, [dispatch, validUntil, postId, deleteStatus]);

  const handleDeleteAction = (action) => {
    switch (action) {
      case null:
        setDeleteData(null);
        break;
      case true:
        dispatch(deleteComment(deleteData.id));
        break;
      default:
        break;
    }
  };

  const renderLoading = () => {
    return (
      <div className="mt-4">
        <div className="w-75 mb-4 ">
          <div className="w-50 mb-2 shine shine-line"></div>
          <div className="w-25 mb-2 shine shine-line"></div>
          <div className="w-75 mb-2 shine shine-line"></div>
          <div className="w-75 mb-2 shine shine-line"></div>
        </div>
        <div className="w-75 mb-4 ">
          <div className="w-50 mb-2 shine shine-line"></div>
          <div className="w-25 mb-2 shine shine-line"></div>
          <div className="w-75 mb-2 shine shine-line"></div>
          <div className="w-75 mb-2 shine shine-line"></div>
        </div>
        <div className="w-75 mb-4 ">
          <div className="w-50 mb-2 shine shine-line"></div>
          <div className="w-25 mb-2 shine shine-line"></div>
          <div className="w-75 mb-2 shine shine-line"></div>
          <div className="w-75 mb-2 shine shine-line"></div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <h4 className="mt-4">Comment</h4>
      {status === "idle" &&
        comment.map((item, key) => (
          <Row key={`comment-${key}`}>
            <Col md={9} className="w-75 mb-4">
              <div className="fw-bold">{item.name}</div>
              <div className="fs-7">{item.email}</div>
              <div className="fs-7">{item.body}</div>
            </Col>
            <Col className="text-end">
              <AsyncButton
                size="sm"
                variant="outline-danger"
                onClick={() => setDeleteData(item)}
                className="me-2"
              >
                Delete
              </AsyncButton>
              <AsyncButton size="sm" variant="outline-primary">
                Edit
              </AsyncButton>
            </Col>
          </Row>
        ))}
      {status === "loading" && renderLoading()}
      {status === "error" && <ErrorPage reFetch={fetchData} />}
      <ModalConfirmation
        show={Boolean(deleteData)}
        onAction={handleDeleteAction}
        title="Delete Comment"
        desc="Are you sure to delete this comment? Action can't be undone"
      />
    </React.Fragment>
  );
};
