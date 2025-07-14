import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaMedal } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["siteStats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/stats");
      return data;
    },
  });

  const tagMutation = useMutation({
    mutationFn: async (tag) => {
      const { data } = await axiosSecure.post("/tags", tag);
      return data;
    },
    onSuccess: () => {
      toast.success("Tag added successfully!");
      reset();
    },
    onError: () => {
      toast.error("Failed to add tag");
    },
  });

  const onsubmit = async (data) => {
    tagMutation.mutate(data);
  };

  const chartData = [
    { name: "Posts", value: stats?.posts || 0 },
    { name: "Comments", value: stats?.comments || 0 },
    { name: "Users", value: stats?.users || 0 },
  ];
  const COLORS = ["#36B37E", "#FF6B6B", "#4C9AFF"];

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="card shadow p-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="admin"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{user?.displayName}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm mt-1">
              Posts: {stats?.posts}, Comments: {stats?.comments}, Users:{" "}
              {stats?.users}
            </p>
          </div>
        </div>
      </div>

      {/* chart */}

      <div className="card shadow p-6">
        <h2 className="text-lg font-bold mb-4">Site Overview</h2>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx={"50%"}
                cy={"50%"}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* posts */}

      <div className="card shadow p-6 mt-6">
        <h3 className="text-lg font-bold mb-4">Add New Tags</h3>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Tag name"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full mt-4">
            Add Tags
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
