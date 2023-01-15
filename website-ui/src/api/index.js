import axios from "axios";

export const BASE_URL = "http://localhost:5071";

export const ENDPOINTS = {
  user: "User",
  login: "User/AuthenticateLogin",
};

export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}/api/${endpoint}/`;

  return {
    fetch: axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (newRecord) => axios.post(url, newRecord),
    put: (id, updatedRecord) => axios.put(url, updatedRecord),
    delete: (id) => axios.delete(url + id),
    login: (loginDetails) => axios.post(url, loginDetails),
  };
};
