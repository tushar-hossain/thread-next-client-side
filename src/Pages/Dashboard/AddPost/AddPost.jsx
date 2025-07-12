import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPost = () => {
  const { user } = useAuth();
  const [selectedTags, setSelectedTags] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const tagOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "mongodb", label: "Mongodb" },
    { value: "express", label: "Express" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Nodejs" },
    { value: "css", label: "CSS" },
    { value: "frontend", label: "Frontend" },
    { value: "authentication", label: "Authentication" },
    { value: "typescript", label: "TypeScript" },
    { value: "backend", label: "Backend" },
  ];

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
      toast.success("Post created!");
      reset();
      setSelectedTags([]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="max-w-xl mx-auto space-y-4 p-4 bg-base-200 rounded"
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

        <button className="btn btn-primary w-full" type="submit">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
