import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ModalConfirmation = (props) => {
  const { show, onAction, title, desc } = props;
  return (
    <Modal show={show} onHide={() => onAction(null)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{desc}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => onAction(null)}>
          Cancel
        </Button>
        <Button variant="outline-primary" onClick={() => onAction(true)}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
