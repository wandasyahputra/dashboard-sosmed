import axios from "axios";

import { FETCH_USERS_DETAIL, FETCH_ALBUMS_PHOTO } from "url/index";

export const fetchRemoteUser = async (id) => {
  return await axios({ method: "get", url: FETCH_USERS_DETAIL(id) });
};

export const fetchRemoteAlbumPhoto = async (id) => {
  return await axios({ method: "get", url: FETCH_ALBUMS_PHOTO(id) });
};
