import config from "config.js";

const baseUrl = config.apis.restapi.url;
// USERS
export const FETCH_USERS = `${baseUrl}users`;
export const FETCH_USERS_DETAIL = (id) => `${baseUrl}users/${id}`;

// POSTS
export const ADD_POST = `${baseUrl}posts`;
export const UPDATE_POST = (id) => `${baseUrl}posts/${id}`;
export const DELETE_POST = (id) => `${baseUrl}posts/${id}`;
export const FETCH_POSTS_DETAIL = (id) => `${baseUrl}posts?id=${id}`;
export const FETCH_POSTS_USER = (id) => `${baseUrl}posts?userId=${id}`;

// COMMENTS
export const ADD_COMMENT = `${baseUrl}comments`;
export const UPDATE_COMMENT = (id) => `${baseUrl}comments/${id}`;
export const DELETE_COMMENT = (id) => `${baseUrl}comments/${id}`;
export const FETCH_POSTS_COMMENT = (id) => `${baseUrl}comments?postId=${id}`;
