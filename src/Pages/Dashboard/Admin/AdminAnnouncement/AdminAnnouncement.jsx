import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import useUserRole from "../../../../hooks/useUserRole";
import { Helmet } from "react-helmet-async";

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
      toast.success("Announcement created successfully");
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
    <div>
      <Helmet>
        <title>Admin Announcement</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
      <p className="text-gray-600 mt-1 mb-6">
        Share important updates, news, or community guidelines with all users.
        Your announcements will be visible on the homepage and notify members.
      </p>

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-6 rounded shadow-md hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
      >
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Announcement Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Announcement Description</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter announcement Description"
            className="textarea textarea-bordered w-full resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm w-full"
        >
          Make Announcement
        </button>
      </form>
    </div>
  );
};

export default AdminAnnouncement;
