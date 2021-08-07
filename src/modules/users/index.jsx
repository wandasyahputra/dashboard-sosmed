import React, { useEffect } from "react";
import {
  fetchUsers,
  selectData,
  selectStatus,
  selectValidUntil,
} from "./reducer";
import { useDispatch, useSelector } from "react-redux";

export const UsersModule = () => {
  const dispatch = useDispatch();
  const userList = useSelector(selectData);
  const validUntil = useSelector(selectValidUntil);
  const loadStatus = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loadStatus !== "loading" &&
        loadStatus !== "error" &&
        userList.map((item, key) => item.name)}
    </React.Fragment>
  );
};
