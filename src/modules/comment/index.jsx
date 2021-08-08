import React, { useEffect, useState } from "react";
import {
  selectStatus,
  selectValidUntil,
  fetchComment,
  selectComment,
  setDeleteStatus,
  selectDeleteStatus,
  deleteComment,
  selectPostId,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "components/alert";
import { AsyncButton } from "components/button";
import { Col, Row } from "react-bootstrap";
import ErrorPage from "components/error-page";
import { ModalConfirmation } from "components/confirmation";
import { ModalEditor } from "./components/modalEditor";

export const CommentModule = (props) => {
  const { postId } = props;
  const dispatch = useDispatch();
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const validUntil = useSelector(selectValidUntil);
  const comment = useSelector(selectComment);
  const status = useSelector(selectStatus);
  const commentPostId = useSelector(selectPostId);
  const deleteStatus = useSelector(selectDeleteStatus);

  const fetchData = () => {
    dispatch(fetchComment(postId));
  };

  useEffect(() => {
    if (validUntil < Date.now() || commentPostId !== postId) {
      dispatch(fetchComment(postId));
    }
    if (deleteStatus === "success") {
      setDeleteData(null);
      showAlert("Success", "Comment deleted succesfully");
      dispatch(setDeleteStatus());
    }
  }, [dispatch, validUntil, postId, deleteStatus, commentPostId]);

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

  const handleEditorAction = (action) => {
    switch (action) {
      case null:
        setEditData(null);
        break;
      case true:
        setEditData(null);
        fetchData();
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
      <Col md={8}>
        <h4 className="mt-4 mb-3">Comment</h4>
      </Col>
      <Col md={4} className="mt-4 mb-3 text-end">
        <AsyncButton onClick={() => setEditData("add")}>
          Add Comment
        </AsyncButton>
      </Col>
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
              <AsyncButton
                size="sm"
                variant="outline-primary"
                onClick={() => setEditData(item)}
              >
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
      {Boolean(editData) && (
        <ModalEditor
          show={Boolean(editData)}
          data={editData}
          postId={postId}
          onAction={handleEditorAction}
        />
      )}
    </React.Fragment>
  );
};
