import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const PostDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/posts/${id}`);
      return data;
    },
  });

  // get all comments
  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comments?postId=${id}`);
      return data;
    },
  });

  // vote update
  const voteMutation = useMutation({
    mutationFn: async (type) => {
      const { data } = await axiosSecure.patch(`/posts/vote/${id}`, { type });
      if (data.modifiedCount) {
        toast.success(
          `You ${type === "up" ? "upvoted" : "downvoted"} the post!`
        );
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // posts comments
  const commentMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post(`/comments`, {
        postId: id,
        name: user?.displayName,
        photo: user?.photoURL,
        email: user?.email,
        text: commentText,
      });
      if (res?.data?.message) {
        toast.error(res?.data?.message);
      } else {
        toast.success("Your comments successful.");
      }

      return res.data;
    },
    onSuccess: () => {
      setCommentText("");
      queryClient?.invalidateQueries(["comments", id]);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-10">
      <div>
        <div>
          <img
            src={posts?.authorImage}
            alt="Author"
            className="w-50 h-50 lg:w-50 lg:h-50 mx-auto"
          />
        </div>
        <h2 className="text-xl font-bold mt-2 font-poppins">{posts.title}</h2>
        <p className="text-sm text-gray-500 font-poppins">
          by {posts.authorName}
        </p>
      </div>
      <p className="my-4 text-base text-gray-700">{posts?.description}</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {posts.tags.map((tag, idx) => (
          <span
            key={idx}
            className="badge badge-outline badge-accent font-poppins"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-4 font-poppins">
        {new Date(posts?.createdAt).toLocaleString()}
      </p>

      <div className="flex gap-3 items-center">
        <button
          className="flex items-center gap-2 font-semibold"
          onClick={() => voteMutation.mutate("up")}
        >
          <AiFillLike className="text-blue-500 cursor-pointer" size={28} />{" "}
          {posts?.upVote}
        </button>
        <button
          className="flex items-center gap-2 font-semibold"
          onClick={() => voteMutation.mutate("down")}
        >
          <BiSolidDislike className="text-blue-500 cursor-pointer" size={28} />{" "}
          {posts?.downVote}
        </button>
      </div>

      {/* comment */}
      <div className="">
        <h1 className="text-lg font-semibold mb-4 font-roboto">Comments</h1>

        <div className="mb-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className=" textarea textarea-bordered resize-none"
            placeholder="Write a comment..."
          ></textarea>
          <button
            onClick={() => commentMutation?.mutate()}
            disabled={!commentText?.trim()}
            className="btn btn-primary "
          >
            Comment
          </button>
        </div>

        <div className="space-y-4">
          {comments?.map((com) => (
            <div key={com?._id} className="bg-gray-100 p-3 rounded">
              <div>
                <div className="flex gap-2 items-center">
                  <img
                    alt="user photo"
                    src={com?.photo}
                    className="w-10 rounded-full"
                  />
                  <p className="font-poppins font-semibold mt-3">{com?.name}</p>
                </div>
              </div>

              <p className="mt-3 font-roboto">{com?.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
