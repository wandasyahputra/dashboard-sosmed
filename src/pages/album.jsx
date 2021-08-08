import React from "react";
import Title from "components/title/index";
import { AlbumModule } from "modules/album";

export const Album = (props) => {
  const userId = parseInt(props.match.params.userId);
  return (
    <>
      <Title title="List Album" />
      <AlbumModule userId={userId} />
    </>
  );
};
