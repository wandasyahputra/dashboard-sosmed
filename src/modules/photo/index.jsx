import React, { useEffect } from "react";
import {
  fetchUser,
  selectData,
  selectStatus,
  selectValidUntil,
  selectAlbumUser,
  setAlbumUser,
  fetchAlbum,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { selectUser } from "modules/users/reducer";
import { TableGrid } from "components/table";
import { AsyncButton } from "components/button/index";

export const AlbumModule = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();
  const albumList = useSelector(selectData);
  const user = useSelector(selectUser(userId));
  const albumUser = useSelector(selectAlbumUser);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  const fetchData = () => {
    dispatch(fetchAlbum(userId));
  };

  useEffect(() => {
    console.log("user");
    if (user) {
      console.log("user");
      dispatch(setAlbumUser(user));
    } else if (!albumUser) {
      console.log("user");
      dispatch(fetchUser(userId));
    }
    if (
      validUntil < Date.now() ||
      (Boolean(albumUser) && albumUser.id !== userId)
    ) {
      dispatch(fetchAlbum(userId));
    }
  }, [dispatch, validUntil, user, userId, albumUser]);

  const goBack = () => {
    window.history.back();
  };

  const columns = [
    {
      name: "Title",
      binding: "title",
      link: (rD) => `/users/${userId}/album/${rD.id}`,
    },
  ];

  return (
    <React.Fragment>
      <Col md={6}>Created by {albumUser && albumUser.name}</Col>
      <Col md={6} className="text-end">
        <AsyncButton
          variant="outline-secondary"
          className="me-2"
          onClick={goBack}
        >
          Close
        </AsyncButton>
      </Col>
      <TableGrid
        columns={columns}
        data={albumList}
        status={loadStatus}
        errorFetch={fetchData}
      />
    </React.Fragment>
  );
};
