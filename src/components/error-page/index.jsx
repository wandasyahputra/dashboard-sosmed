import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

const ErrorPage = (props) => {
  const { reFetch } = props;

  return (
    <Card>
      <Card.Body className="text-center">
        <div className="mb-2">
          Can't connect to server, please check your connection and try again
        </div>
        <Button variant="outline-secondary" onClick={reFetch}>
          Refresh
        </Button>
      </Card.Body>
    </Card>
  );
};

ErrorPage.defaultProps = {
  reFetch: () => null,
};

ErrorPage.propTypes = {
  reFetch: PropTypes.func,
};

export default ErrorPage;
