import React from "react";
import Title from "components/title/index";
import { PostModule } from "modules/post";

export const Post = (props) => {
  const userId = parseInt(props.match.params.userId);
  return (
    <>
      <Title title="List Post" />
      <PostModule userId={userId} />
    </>
  );
};
