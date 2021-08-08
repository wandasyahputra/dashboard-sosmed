import React from "react";
import { Button } from "react-bootstrap";

export const AsyncButton = (props) => {
  const { variant, children, busy, disabled, ...rest } = props;
  return (
    <Button variant={variant} disabled={busy || disabled} {...rest}>
      {busy ? "Loading" : children}
    </Button>
  );
};
