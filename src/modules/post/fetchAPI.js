import axios from "axios";

import {
  FETCH_USERS_DETAIL,
  FETCH_POSTS_USER,
  DELETE_POST,
  UPDATE_POST,
  ADD_POST,
} from "url/index";

export const fetchRemoteUser = async (id) => {
  return await axios({ method: "get", url: FETCH_USERS_DETAIL(id) });
};

export const fetchRemotePost = async (id) => {
  return await axios({ method: "get", url: FETCH_POSTS_USER(id) });
};

export const postRemotePost = async (data) => {
  return await axios({ method: "post", url: ADD_POST, data });
};

export const editRemotePost = async (id, data) => {
  return await axios({ method: "put", url: UPDATE_POST(id), data });
};

export const deleteRemotePost = async (id) => {
  return await axios({ method: "delete", url: DELETE_POST(id) });
};
