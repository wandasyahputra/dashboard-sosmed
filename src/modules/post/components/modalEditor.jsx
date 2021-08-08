import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  selectData,
  fetchUsers,
  selectStatus,
  selectValidUntil,
} from "modules/users/reducer";
import { AsyncButton } from "components/button";
import { showAlert } from "components/alert";
import {
  editPost,
  selectEditorStatus,
  postPost,
  setEditorStatus,
} from "../reducer";

const defaultValue = {
  id: 0,
  userId: "",
  title: "",
  body: "",
};

export const ModalEditor = (props) => {
  const { show, data, onAction } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(defaultValue);
  const userList = useSelector(selectData);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);
  const saveStatus = useSelector(selectEditorStatus);

  useEffect(() => {
    if (validUntil < Date.now()) {
      dispatch(fetchUsers());
    }
    if (saveStatus === "success") {
      showAlert("Success", "Data saved succesfully");
      dispatch(setEditorStatus());
      onAction(true);
    }
  }, [dispatch, validUntil, saveStatus, onAction]);

  useEffect(() => {
    if (data !== "add") {
      setValue(data);
    }
  }, [data]);

  const handleSave = () => {
    const data = {
      userId: value.userId,
      body: value.body,
      title: value.title,
    };
    if (value.id !== 0)
      dispatch(editPost({ id: value.id, data: { ...data, id: value.id } }));
    else dispatch(postPost(value));
  };

  const onChange = (e, key) => {
    setValue((prev) => ({
      ...prev,
      [`${key}`]: e.target.value,
    }));
  };

  return (
    <Modal show={show} onHide={() => onAction(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{value.id ? "Edit Post" : "Add New Post"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              User
            </Form.Label>
            <Col sm="10">
              <Form.Select
                name="user"
                value={value.userId}
                onChange={(e) => onChange(e, "userId")}
              >
                <option disabled value="">
                  Please Select
                </option>
                {userList.map((item, key) => (
                  <option
                    key={`option-${key}`}
                    value={item.id}
                  >{`${item.username} (${item.name})`}</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                onChange={(e) => onChange(e, "title")}
                placeholder="Title"
                value={value.title}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Body
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                style={{ height: 100 }}
                placeholder="Content"
                onChange={(e) => onChange(e, "body")}
                value={value.body}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <AsyncButton variant="outline-secondary" onClick={() => onAction(null)}>
          Close
        </AsyncButton>
        <AsyncButton
          variant="outline-primary"
          onClick={handleSave}
          disabled={
            value.userId === "" || value.title === "" || value.body === ""
          }
          busy={loadStatus === "loading" || saveStatus === "loading"}
        >
          Save Changes
        </AsyncButton>
      </Modal.Footer>
    </Modal>
  );
};
