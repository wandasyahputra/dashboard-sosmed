import React from "react";
import { Modal } from "react-bootstrap";
import { AsyncButton } from "components/button";

export const ModalPhoto = (props) => {
  const { data, onAction } = props;

  return (
    <Modal show onHide={() => onAction(null)} size="md">
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <img src={data.url} className="w-100" alt="" />
      </Modal.Body>
      <Modal.Footer>
        <AsyncButton variant="outline-secondary" onClick={() => onAction(null)}>
          Close
        </AsyncButton>
      </Modal.Footer>
    </Modal>
  );
};
