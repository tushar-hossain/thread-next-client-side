import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaUserShield, FaSearch } from "react-icons/fa";

const ManageUsers = () => {
  const [searchName, setSearchName] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchName],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?name=${searchName}`);
      return data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const { data } = await axiosSecure.patch(`/users/admin/${userId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("User promoted to admin successfully");
      refetch();
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Manage Users</title>
      </Helmet>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-poppins flex items-center gap-2">
          <FaUserShield className="text-blue-600" /> Manage Users
        </h2>
        <p className="text-gray-600 mt-2">
          View all registered users, assign admin roles, and monitor membership
          status. Use the search bar to quickly find users.
        </p>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by user name..."
            className="input input-bordered w-full pl-10 pr-4 py-2 rounded-lg shadow-sm"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Subscription</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td>{index + 1}</td>
                <td className="flex items-center gap-3">
                  <img
                    src={user.photo || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="text-gray-600">{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success text-sm">Admin</span>
                  ) : (
                    <button
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm btn-xs"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.membership === "gold" ? (
                    <span className="badge badge-warning text-sm">Gold</span>
                  ) : (
                    <span className="badge bg-gray-200 text-sm">Free</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
