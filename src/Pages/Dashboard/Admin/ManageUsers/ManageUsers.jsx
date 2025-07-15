import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";

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
      toast.success("User made admin successfully");
      refetch();
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div>
        <h2 className="text-xl font-bold font-poppins mb-4">Manage Users</h2>

        <div className="text-center">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by users name"
            className="input input-bordered mb-4 w-full max-w-xs"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full bg-base-200">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Subscription</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success text-sm">Admin</span>
                  ) : (
                    <button
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm btn-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.membership === "gold" ? (
                    <span className="badge badge-warning">Gold</span>
                  ) : (
                    <span className="badge bg-white">Free</span>
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
