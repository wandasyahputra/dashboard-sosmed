import config from "config.js";

const baseUrl = config.apis.restapi.url;
// USERS
export const FETCH_USERS = `${baseUrl}users`;
export const FETCH_USERS_DETAIL = (id) => `${baseUrl}users/${id}`;
