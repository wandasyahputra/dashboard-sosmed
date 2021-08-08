import React from "react";
import Title from "components/title/index";
import { PhotoModule } from "modules/photo";

export const Photo = (props) => {
  const userId = parseInt(props.match.params.userId);
  const albumId = parseInt(props.match.params.albumId);
  return (
    <>
      <Title title="List Photo" />
      <PhotoModule userId={userId} albumId={albumId} />
    </>
  );
};
