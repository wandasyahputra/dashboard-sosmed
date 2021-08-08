import React, { useEffect } from "react";
import {
  fetchUsers,
  selectData,
  selectStatus,
  selectValidUntil,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TableGrid } from "components/table";

export const UsersModule = () => {
  const dispatch = useDispatch();
  const userList = useSelector(selectData);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  const fetchData = () => {
    dispatch(fetchUsers());
  };

  useEffect(() => {
    if (validUntil < Date.now()) {
      dispatch(fetchUsers());
    }
  }, [dispatch, validUntil]);

  const viewTemplate = (rD) => {
    return (
      <>
        <Link to={`/users/${rD.id}/post`}>
          <Button variant="outline-primary" className="me-2">
            Post
          </Button>
        </Link>
        <Link to={`/users/${rD.id}/album`}>
          <Button variant="outline-primary">Album</Button>
        </Link>
      </>
    );
  };

  const columns = [
    {
      name: "Name",
      binding: "name",
    },
    {
      name: "User Name",
      binding: "username",
    },
    {
      name: "Email",
      binding: "email",
    },
    {
      name: "View",
      binding: "view",
      template: viewTemplate,
    },
  ];

  return (
    <React.Fragment>
      <TableGrid
        columns={columns}
        data={userList}
        status={loadStatus}
        fetchData={fetchData}
      />
    </React.Fragment>
  );
};
