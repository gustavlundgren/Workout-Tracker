import axios from "axios";

export const BASE_URL = "https://localhost:7243";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

export const ENDPOINTS = {
  register: "register",
  login: "login",
  getUserById: "GetUser",
  getAllUsers: "GetUsers",
  refresh: "refresh",
};

export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}/api/Auth/${endpoint}/`;
 
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    fetchAllUsers: (controller) =>
      axios.get(url, { signal: controller.signal }),
  };
};
