import React from "react";
import Title from "components/title/index";
import { UsersModule } from "modules/users";

export const Users = () => {
  return (
    <>
      <Title title="List Users" />
      <UsersModule />
    </>
  );
};
