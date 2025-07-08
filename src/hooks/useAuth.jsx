import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const useAuth = () => {
  const userInfo = use(AuthContext);
  return userInfo;
};

export default useAuth;
