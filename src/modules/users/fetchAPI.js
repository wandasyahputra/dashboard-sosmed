import axios from "axios";

import { FETCH_USERS } from "url/index";

export const fetchRemoteUser = async () => {
  return await axios({ method: "get", url: FETCH_USERS });
};
