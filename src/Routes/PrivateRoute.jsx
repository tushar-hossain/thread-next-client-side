import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../Pages/Shared/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate state={location.pathname} to="/joinUs" />;
  }

  return children;
};

export default PrivateRoute;
