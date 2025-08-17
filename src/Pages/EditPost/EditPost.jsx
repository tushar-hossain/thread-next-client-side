import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import { useState } from "react";
import toast from "react-hot-toast";

function EditPost() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedTags, setSelectedTags] = useState([]);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/posts/${id}`);
      return data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const tagOptions = tags.map((tag) => ({ value: tag.name, label: tag.name }));

  const onsubmit = async (data) => {
    const postData = {
      title: data.title,
      description: data.description,
      tags: selectedTags.map((tag) => tag.value),
    };
    console.log(postData);

    // const res = await axiosSecure.patch(`/update-posts`, postData);

    // if (res.data.insertedId) {
    //   toast.success("Post successful created!");
    //   reset();
    //   setSelectedTags([]);
    // }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Edit Post</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
        Update Post
      </h2>

      {/* update form */}
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
            defaultValue={posts?.title}
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
            defaultValue={posts?.description}
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
}

export default EditPost;
