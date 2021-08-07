import React, { useEffect } from "react";
import {
  fetchUsers,
  selectData,
  selectStatus,
  selectValidUntil,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import ErrorPage from "components/error-page";
import { TableShimmer } from "./components/table-shimmer";

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

  return (
    <React.Fragment>
      {loadStatus !== "loading" && loadStatus !== "error" && (
        <Table hover>
          <thead>
            <tr>
              <td>No</td>
              <td>Name</td>
              <td>Username</td>
              <td>Email</td>
              <td>View</td>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, key) => (
              <tr key={`${item.email}-${key}`}>
                <td>{key + 1}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>
                  <Button variant="outline-primary" className="me-2">
                    Post
                  </Button>
                  <Button variant="outline-primary">Album</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {loadStatus === "loading" && <TableShimmer />}
      {loadStatus !== "loading" && loadStatus === "error" && (
        <ErrorPage reFetch={fetchData} />
      )}
    </React.Fragment>
  );
};
