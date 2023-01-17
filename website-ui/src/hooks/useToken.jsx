import { default as axios, ENDPOINTS } from "../api/index";
import useAuth from "./useAuth";
import jwt_decode from "jwt-decode";

const useToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (user) => {
    const response = await axios.post(`/api/Auth/${ENDPOINTS.refresh}`, user, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(jwt_decode(response.data.token));
      return { ...prev, token: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useToken;

// -TODO
