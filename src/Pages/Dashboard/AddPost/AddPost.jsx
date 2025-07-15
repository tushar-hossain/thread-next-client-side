import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { useNavigate } from "react-router";

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

  // const tagOptions = [
  //   { value: "javascript", label: "JavaScript" },
  //   { value: "mongodb", label: "Mongodb" },
  //   { value: "express", label: "Express" },
  //   { value: "react", label: "React" },
  //   { value: "nodejs", label: "Nodejs" },
  //   { value: "css", label: "CSS" },
  //   { value: "frontend", label: "Frontend" },
  //   { value: "authentication", label: "Authentication" },
  //   { value: "typescript", label: "TypeScript" },
  //   { value: "backend", label: "Backend" },
  // ];

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
      toast.success("Post successful created!");
      reset();
      setSelectedTags([]);
    }
  };

  // 5 posts if not gold
  if (profile?.membership !== "gold" && postCount >= 5) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4">You've reached your 5 post limit.</p>
        <button
          onClick={() => navigate("/membership")}
          className="btn btn-primary"
        >
          Become a Member
        </button>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="max-w-xl mx-auto space-y-4 p-4 bg-white rounded-md shadow-md hover:shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
      >
        <div>
          <input
            type="text"
            readOnly
            defaultValue={user.displayName}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <input
            type="text"
            readOnly
            defaultValue={user.email}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <input
            type="text"
            readOnly
            defaultValue={user.photoURL}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <input
            {...register("title", { required: true })}
            placeholder="Post Title"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}
        </div>
        <div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Post Description"
            className="textarea textarea-bordered w-full resize-none"
          />
          {errors.description && (
            <span className="text-red-500">Description is required</span>
          )}
        </div>
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

        <button
          className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm w-full"
          type="submit"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
