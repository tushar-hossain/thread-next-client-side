import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      if (!user?.accessToken) {
        return config;
      }
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      if (status === 403) {
        return navigate("/");
      } else if (status === 401) {
        logOut()
          .then(() => {
            navigate("/joinUs");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
