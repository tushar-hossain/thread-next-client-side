import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import useUserRole from "../../../../hooks/useUserRole";

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
      <div>
        <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>

        <form onSubmit={handleSubmit(onsubmit)}>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
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
          <button type="submit" className="btn btn-primary w-full">
            Make Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAnnouncement;
