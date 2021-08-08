import React, { useEffect, useState } from "react";
import {
  fetchUser,
  selectData,
  selectStatus,
  selectValidUntil,
  selectPostUser,
  selectDeleteStatus,
  setPostUser,
  fetchPost,
  deletePost,
  setDeleteStatus,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { selectUser } from "modules/users/reducer";
import { TableGrid } from "components/table";
import { ModalConfirmation } from "components/confirmation";
import { showAlert } from "components/alert";
import { ModalEditor } from "./components/modalEditor";
import { AsyncButton } from "components/button/index";

export const PostModule = (props) => {
  const { userId } = props;
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const postList = useSelector(selectData);
  const user = useSelector(selectUser(userId));
  const postUser = useSelector(selectPostUser);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);
  const deleteStatus = useSelector(selectDeleteStatus);

  const fetchData = () => {
    dispatch(fetchPost(userId));
  };

  useEffect(() => {
    if (user) {
      dispatch(setPostUser(user));
    } else if (!postUser) {
      dispatch(fetchUser(userId));
    }
    if (
      validUntil < Date.now() ||
      (Boolean(postUser.id) && postUser.id !== userId)
    ) {
      dispatch(fetchPost(userId));
    }
    if (deleteStatus === "success") {
      setDeleteData(null);
      showAlert("Success", "Post deleted succesfully");
      dispatch(setDeleteStatus());
    }
  }, [dispatch, validUntil, user, userId, deleteStatus, postUser]);

  const cutter = (rD, binding) => {
    const maxLength = binding === "title" ? 15 : 30;
    if (rD[binding].length > maxLength) {
      return `${rD[binding].slice(maxLength)}...`;
    } else return rD[binding];
  };

  const goBack = () => {
    window.history.back();
  };

  const handleDeleteAction = (action) => {
    switch (action) {
      case null:
        setDeleteData(null);
        break;
      case true:
        dispatch(deletePost(deleteData.id));
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

  const renderDelete = (rD) => {
    return (
      <div className="text-nowrap">
        <AsyncButton
          variant="outline-danger"
          className="me-2"
          onClick={() => setDeleteData(rD)}
        >
          Delete
        </AsyncButton>
        <AsyncButton variant="outline-primary" onClick={() => setEditData(rD)}>
          Edit
        </AsyncButton>
      </div>
    );
  };

  const columns = [
    {
      name: "Title",
      binding: "title",
      link: (rD) => `/users/${userId}/post/${rD.id}`,
      template: (rD) => cutter(rD, "title"),
    },
    {
      name: "Content",
      binding: "body",
      template: (rD) => cutter(rD, "body"),
    },
    {
      name: "Action",
      binding: "delete",
      template: renderDelete,
    },
  ];

  return (
    <React.Fragment>
      <Col md={6}>Created by {postUser.name}</Col>
      <Col md={6} className="text-end">
        <AsyncButton
          variant="outline-secondary"
          className="me-2"
          onClick={goBack}
        >
          Close
        </AsyncButton>
        <AsyncButton variant="primary" onClick={() => setEditData("add")}>
          Add Post
        </AsyncButton>
      </Col>
      <TableGrid
        columns={columns}
        data={postList}
        status={loadStatus}
        errorFetch={fetchData}
      />
      <ModalConfirmation
        show={Boolean(deleteData)}
        onAction={handleDeleteAction}
        title="Delete Post"
        desc="Are you sure to delete this post? Action can't be undone"
      />
      {Boolean(editData) && (
        <ModalEditor
          show={Boolean(editData)}
          data={editData}
          onAction={handleEditorAction}
        />
      )}
    </React.Fragment>
  );
};
