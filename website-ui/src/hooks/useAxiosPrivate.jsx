import { axiosPrivate } from "../api";
import { useEffect } from "react";
import useToken from "./useToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { refresh } = useToken();
  const { auth } = useAuth();

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return axiosPrivate;
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
