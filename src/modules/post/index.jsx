import React, { useEffect } from "react";
import {
  fetchUser,
  selectData,
  selectStatus,
  selectValidUntil,
  selectPostUser,
  setPostUser,
  fetchPost,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { selectUser } from "modules/users/reducer";
import { TableGrid } from "components/table";

export const PostModule = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();
  const postList = useSelector(selectData);
  const user = useSelector(selectUser(userId));
  const postUser = useSelector(selectPostUser);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  const fetchData = () => {
    dispatch(fetchUser(userId));
  };

  useEffect(() => {
    if (user) {
      dispatch(setPostUser(user));
    } else {
      dispatch(fetchUser(userId));
    }
    if (validUntil < Date.now()) {
      dispatch(fetchPost(userId));
    }
  }, [dispatch, validUntil, user, userId]);

  const cutter = (rD, binding) => {
    const maxLength = binding === "title" ? 15 : 30;
    if (rD[binding].length > maxLength) {
      return `${rD[binding].slice(maxLength)}...`;
    } else return rD[binding];
  };

  const columns = [
    {
      name: "Title",
      binding: "title",
      link: true,
      template: (rD) => cutter(rD, "title"),
    },
    {
      name: "Content",
      binding: "body",
      template: (rD) => cutter(rD, "body"),
    },
  ];

  return (
    <React.Fragment>
      <Col>Created by {postUser.name}</Col>
      <TableGrid
        columns={columns}
        data={postList}
        status={loadStatus}
        errorFetch={fetchData}
      />
    </React.Fragment>
  );
};
