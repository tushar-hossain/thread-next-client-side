import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  FaUsers,
  FaComments,
  FaFileAlt,
  FaTags,
  FaChartPie,
  FaChartBar,
  FaPlus,
  FaCrown,
  FaCalendarAlt,
} from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [activeChart, setActiveChart] = useState("pie");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to add tag");
    },
  });

  const onSubmit = async (data) => {
    if (data.name.trim()) {
      tagMutation.mutate({ name: data.name.trim().toLowerCase() });
    }
  };

  const chartData = [
    { name: "Posts", value: stats?.posts || 0, color: "#0ea5e9" },
    { name: "Comments", value: stats?.comments || 0, color: "#d946ef" },
    { name: "Users", value: stats?.users || 0, color: "#22c55e" },
  ];

  const COLORS = ["#0ea5e9", "#d946ef", "#22c55e"];

  const statsCards = [
    {
      title: "Total Users",
      value: stats?.users || 0,
      icon: FaUsers,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500",
      change: "+12%",
    },
    {
      title: "Total Posts",
      value: stats?.posts || 0,
      icon: FaFileAlt,
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-500",
      change: "+8%",
    },
    {
      title: "Total Comments",
      value: stats?.comments || 0,
      icon: FaComments,
      color: "from-fuchsia-500 to-fuchsia-600",
      bgColor: "bg-fuchsia-500",
      change: "+15%",
    },
    {
      title: "Active Tags",
      value: stats?.tags || 0,
      icon: FaTags,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500",
      change: "+5%",
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Admin Dashboard - ThredNest</title>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={user?.photoURL}
                alt="Admin Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-sky-200"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.displayName || "Admin"
                  )}&background=0ea5e9&color=ffffff&size=200`;
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-2">
                <FaCrown className="text-white text-sm" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-slate-800">
                  {user?.displayName}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-sky-100 text-sky-800 w-fit">
                  <FaCrown className="mr-2" />
                  Administrator
                </span>
              </div>

              <p className="text-slate-600 mb-4">{user?.email}</p>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt />
                  Joined {new Date().toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <IoMdTrendingUp />
                  Last login: Today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-emerald-600 font-medium mt-2 flex items-center gap-1">
                    <IoMdTrendingUp size={12} />
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${stat.color}`}
                >
                  <stat.icon className="text-white text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Chart Controls & Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FaChartPie className="text-sky-500" />
                Site Overview
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveChart("pie")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeChart === "pie"
                      ? "bg-sky-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <FaChartPie className="inline mr-1" />
                  Pie
                </button>
                <button
                  onClick={() => setActiveChart("bar")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeChart === "bar"
                      ? "bg-sky-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <FaChartBar className="inline mr-1" />
                  Bar
                </button>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "pie" ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                      outerRadius={100}
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
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Count"]}
                      labelStyle={{ color: "#374151" }}
                    />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                    <Tooltip
                      formatter={(value) => [value.toLocaleString(), "Count"]}
                      labelStyle={{ color: "#374151" }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Add Tags Form */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FaTags className="text-sky-500" />
              Manage Tags
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tag Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Tag name is required",
                    minLength: {
                      value: 2,
                      message: "Tag must be at least 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Tag must be less than 20 characters",
                    },
                  })}
                  placeholder="Enter new tag name (e.g., technology, health)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 placeholder-slate-400"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={tagMutation.isPending}
                className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              >
                {tagMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Adding Tag...</span>
                  </>
                ) : (
                  <>
                    <FaPlus />
                    <span>Add New Tag</span>
                  </>
                )}
              </button>
            </form>

            {/* Recent Tags Info */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-2">
                Tag Guidelines
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Use lowercase letters only</li>
                <li>• Keep tags between 2-20 characters</li>
                <li>• Use single words or combine with hyphens</li>
                <li>• Avoid special characters and spaces</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-left">
              <FaUsers className="text-emerald-500 text-xl" />
              <div>
                <p className="font-medium text-slate-800">Manage Users</p>
                <p className="text-sm text-slate-600">
                  View and moderate users
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-left">
              <FaFileAlt className="text-sky-500 text-xl" />
              <div>
                <p className="font-medium text-slate-800">Manage Posts</p>
                <p className="text-sm text-slate-600">
                  Review and moderate posts
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors duration-200 text-left">
              <FaComments className="text-fuchsia-500 text-xl" />
              <div>
                <p className="font-medium text-slate-800">View Reports</p>
                <p className="text-sm text-slate-600">Check reported content</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
