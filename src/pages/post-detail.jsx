import React from "react";
import { PostDetailModule } from "modules/post-detail";
import { CommentModule } from "modules/comment";

export const PostDetail = (props) => {
  const userId = parseInt(props.match.params.userId);
  const postId = parseInt(props.match.params.postId);
  return (
    <>
      <PostDetailModule userId={userId} postId={postId} />
      <CommentModule postId={postId} />
    </>
  );
};
