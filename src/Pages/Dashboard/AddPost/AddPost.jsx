import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

const AddPost = () => {
  const { user } = useAuth();
  const [selectedTags, setSelectedTags] = useState([]);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: postCount = 0, isLoading } = useQuery({
    queryKey: ["postCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/posts/count?email=${user.email}`
      );
      return data;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const tagOptions = tags.map((tag) => ({ value: tag.name, label: tag.name }));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    const postData = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: data.title,
      description: data.description,
      tags: selectedTags.map((tag) => tag.value),
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post(`/posts`, postData);
    if (res.data.insertedId) {
      toast.success("Post successfully created!");
      reset();
      setSelectedTags([]);
    }
  };

  // Limit check for non-gold users
  if (profile?.membership !== "gold" && postCount >= 5) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4 text-lg text-gray-700">
          You've reached your 5 post limit.
        </p>
        <button
          onClick={() => navigate("/membership")}
          className="btn btn-primary px-6 py-2"
        >
          Become a Member
        </button>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Helmet>
        <title>Add Post</title>
      </Helmet>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-primary mb-3">
        Create a New Post
      </h2>
      <p className="text-gray-600 mb-6">
        Share your thoughts, ask questions, or start a discussion. Fill out the
        form below to publish your post.
      </p>

      {/* Post Form */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 hover:shadow-lg transition-shadow"
      >
        {/* Read-only user info */}
        <div className="space-y-2">
          <input
            type="text"
            readOnly
            value={user.displayName}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            readOnly
            value={user.email}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            readOnly
            value={user.photoURL}
            className="input input-bordered w-full"
          />
        </div>

        {/* Post title */}
        <div>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Post Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        {/* Post description */}
        <div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Post Description"
            className="textarea textarea-bordered w-full resize-none h-32"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        {/* Tags select */}
        <div>
          <Select
            isMulti
            name="tags"
            options={tagOptions}
            onChange={setSelectedTags}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select Tags"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white w-full py-2 transition-all duration-300"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
