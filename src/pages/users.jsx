import React from "react";
import Title from "components/title";
import { UsersModule } from "modules/users";

export const Users = () => {
  return (
    <>
      <Title title="Users" />
      <UsersModule />
    </>
  );
};
