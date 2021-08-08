import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

let setAlert;

const useAlert = (callback) => {
  setAlert = callback;
};

export const showAlert = (level, message) => {
  if (!setAlert) {
    return;
  }
  setAlert({ level, message });
};

export const Alert = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  useAlert(setMessage);

  React.useEffect(() => {
    if (message && message.message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    setMessage(null);
  };

  return (
    message && (
      <ToastContainer position="top-end">
        <Toast show={open} onClose={handleClose} autohide>
          <Toast.Header>
            <strong className="me-auto">{message.level}</strong>
          </Toast.Header>
          <Toast.Body>{message.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
  );
};
