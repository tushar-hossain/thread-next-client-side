import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import useUserRole from "../../../../hooks/useUserRole";
import { Helmet } from "react-helmet-async";
import { MdAnnouncement } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";

const AdminAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (announcement) => {
      const { data } = await axiosSecure.post("/announcements", announcement);
      return data;
    },
    onSuccess: () => {
      toast.success("✅ Announcement created successfully!");
      reset();
    },
    onError: (error) => {
      toast.error("Failed to create announcement: " + error.message);
    },
  });

  const onsubmit = async (data) => {
    const announcement = {
      ...data,
      authorName: user?.displayName || "Admin",
      authorEmail: user?.email || "",
      authorPhoto: user?.photoURL || "",
      role: role || "user",
      createdAt: new Date().toISOString(),
    };

    mutation.mutate(announcement);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Helmet>
        <title>Admin | Announcement</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <MdAnnouncement className="text-3xl text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Make Announcement</h2>
      </div>
      <p className="text-gray-600 mb-6">
        📢 Share important updates, news, or community guidelines with all
        users. Your announcements will appear on the homepage and notify members
        instantly.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
      >
        {/* Title */}
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text font-medium">📌 Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full rounded-lg"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control mb-5">
          <label className="label">
            <span className="label-text font-medium">📝 Description</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Write your announcement details here..."
            rows={5}
            className="textarea textarea-bordered w-full resize-none rounded-lg"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-base rounded-lg"
        >
          <FaRegPaperPlane />
          Make Announcement
        </button>
      </form>
    </div>
  );
};

export default AdminAnnouncement;
