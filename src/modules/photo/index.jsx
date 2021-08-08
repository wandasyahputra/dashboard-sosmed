import React, { useEffect, useState } from "react";
import {
  fetchUser,
  selectData,
  selectStatus,
  selectValidUntil,
  selectPhotoUser,
  selectAlbumId,
  setPhotoUser,
  fetchPhoto,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Col, Card } from "react-bootstrap";
import { selectUser } from "modules/users/reducer";
import { AsyncButton } from "components/button/index";
import { ModalPhoto } from "./components/modalPhoto";
import ErrorPage from "components/error-page";

export const PhotoModule = (props) => {
  const { userId, albumId } = props;
  const dispatch = useDispatch();
  const photoList = useSelector(selectData);
  const [openPhoto, setOpenPhoto] = useState(false);
  const user = useSelector(selectUser(userId));
  const photoUser = useSelector(selectPhotoUser);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);
  const photoAlbumId = useSelector(selectAlbumId);

  const fetchData = () => {
    dispatch(fetchPhoto(albumId));
  };

  useEffect(() => {
    if (user) {
      dispatch(setPhotoUser(user));
    } else if (!photoUser) {
      dispatch(fetchUser(userId));
    }
    if (validUntil < Date.now() || photoAlbumId !== albumId) {
      dispatch(fetchPhoto(albumId));
    }
  }, [dispatch, validUntil, user, userId, photoUser, photoAlbumId, albumId]);

  const goBack = () => {
    window.history.back();
  };

  const renderLoading = () => {
    return (
      <>
        <Card style={{ width: "18rem" }} className="m-3 p-0 cursor-pointer">
          <div className="shine shine-image"></div>
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="shine shine-line mb-2"></div>
            <div className="shine shine-line"></div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="m-3 p-0 cursor-pointer">
          <div className="shine shine-image"></div>
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="shine shine-line mb-2"></div>
            <div className="shine shine-line"></div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="m-3 p-0 cursor-pointer">
          <div className="shine shine-image"></div>
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="shine shine-line mb-2"></div>
            <div className="shine shine-line"></div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="m-3 p-0 cursor-pointer">
          <div className="shine shine-image"></div>
          <Card.Body className="d-flex flex-column justify-content-between">
            <div className="shine shine-line mb-2"></div>
            <div className="shine shine-line"></div>
          </Card.Body>
        </Card>
      </>
    );
  };

  return (
    <React.Fragment>
      <Col md={6}>Created by {photoUser && photoUser.name}</Col>
      <Col md={6} className="text-end">
        <AsyncButton
          variant="outline-secondary"
          className="me-2"
          onClick={goBack}
        >
          Close
        </AsyncButton>
      </Col>
      {loadStatus === "loading" && renderLoading()}
      {loadStatus === "idle" &&
        photoList.map((item, key) => (
          <Card
            style={{ width: "18rem" }}
            key={`photo-${key}`}
            className="m-3 p-0 cursor-pointer"
            onClick={() => setOpenPhoto(item)}
          >
            <Card.Img variant="top" className="" src={item.thumbnailUrl} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>{item.title}</div>
            </Card.Body>
          </Card>
        ))}
      {openPhoto && (
        <ModalPhoto data={openPhoto} onAction={() => setOpenPhoto(false)} />
      )}
      {loadStatus === "error" && <ErrorPage reFetch={fetchData} />}
    </React.Fragment>
  );
};
