import axios from "axios";

export const BASE_URL = "https://localhost:7243";

export const ENDPOINTS = {
  register: "register",
  login: "login",
  getUserById: "GetUser",
  getAllUsers: "GetUsers",
};

export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}/api/Auth/${endpoint}/`;

  return {
    fetch: axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url, updatedRecord),
    delete: (id) => axios.delete(url + id),
    fetchAllUsers: (controller) =>
      axios.get(url, { signal: controller.signal }),
  };
};
