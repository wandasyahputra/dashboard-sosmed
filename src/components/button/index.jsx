import React from "react";
import { Button } from "react-bootstrap";

export const AsyncButton = (props) => {
  const { variant, children, busy, ...rest } = props;
  return (
    <Button variant={variant} disabled={busy} {...rest}>
      {busy ? "Loading" : children}
    </Button>
  );
};
