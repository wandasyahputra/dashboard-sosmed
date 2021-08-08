import axios from "axios";

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  FETCH_POSTS_COMMENT,
  UPDATE_COMMENT,
} from "url/index";

export const fetchRemoteComment = async (postId) => {
  return await axios({ method: "get", url: FETCH_POSTS_COMMENT(postId) });
};

export const postRemoteComment = async (data) => {
  return await axios({ method: "post", url: ADD_COMMENT, data });
};

export const editRemoteComment = async (id, data) => {
  return await axios({ method: "put", url: UPDATE_COMMENT(id), data });
};

export const deleteRemoteComment = async (id) => {
  return await axios({ method: "delete", url: DELETE_COMMENT(id) });
};
