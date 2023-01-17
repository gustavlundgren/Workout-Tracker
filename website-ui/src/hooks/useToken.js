import { default as axios, ENDPOINTS } from "../api/index";
import useAuth from "./useAuth";

const useToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`/api/Auth/${ENDPOINTS.refresh}/`, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.token);
      return { ...prev, token: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};

export default useToken;


// -TODO
