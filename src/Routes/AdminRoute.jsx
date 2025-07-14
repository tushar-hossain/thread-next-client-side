import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loading from "../Pages/Shared/Loading";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, authLoading } = useUserRole();
  const location = useLocation();

  if (loading || authLoading) return <Loading />;

  if (!user || role !== "admin") {
    return <Navigate state={location.pathname} to="/" />;
  }

  return children;
};

export default AdminRoute;
