import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AsyncButton } from "components/button";
import { showAlert } from "components/alert";
import {
  editComment,
  selectEditorStatus,
  postComment,
  setEditorStatus,
} from "../reducer";

const defaultValue = {
  body: "",
  email: "",
  id: 0,
  name: "",
  postId: 0,
};

export const ModalEditor = (props) => {
  const { show, data, onAction, postId } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState(defaultValue);
  const saveStatus = useSelector(selectEditorStatus);

  useEffect(() => {
    if (saveStatus === "success") {
      showAlert("Success", "Comment saved succesfully");
      dispatch(setEditorStatus());
      onAction(true);
    }
  }, [dispatch, saveStatus, onAction]);

  useEffect(() => {
    if (data !== "add") {
      setValue(data);
    }
  }, [data]);

  const handleSave = () => {
    const data = {
      body: value.body,
      email: value.email,
      name: value.name,
      postId: postId,
      id: value.id,
    };
    if (value.id !== 0) dispatch(editComment({ id: value.id, data }));
    else dispatch(postComment(value));
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
        <Modal.Title>
          {value.id ? "Edit Comment" : "Add New Comment"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                onChange={(e) => onChange(e, "name")}
                placeholder="Name"
                value={value.name}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => onChange(e, "email")}
                value={value.email}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Content
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
            value.name === "" || value.email === "" || value.body === ""
          }
          busy={saveStatus === "loading"}
        >
          Save Changes
        </AsyncButton>
      </Modal.Footer>
    </Modal>
  );
};
