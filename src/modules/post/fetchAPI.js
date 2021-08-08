import axios from "axios";

import { FETCH_USERS_DETAIL, FETCH_POSTS_USER } from "url/index";

export const fetchRemoteUser = async (id) => {
  return await axios({ method: "get", url: FETCH_USERS_DETAIL(id) });
};

export const fetchRemotePost = async (id) => {
  return await axios({ method: "get", url: FETCH_POSTS_USER(id) });
};
