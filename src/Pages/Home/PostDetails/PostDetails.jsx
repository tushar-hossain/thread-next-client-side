import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { FaCommentAlt } from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const PostDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [commentText, setCommentText] = useState("");
  const queryClient = useQueryClient();
  const [comment, setComment] = useState(false);

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
        postTitle: posts.title,
        name: user?.displayName,
        photo: user?.photoURL,
        email: user?.email,
        text: commentText,
        createdAt: new Date().toISOString(),
      });

      if (res?.data?.message) {
        toast.error(res?.data?.message);
      } else {
        toast.success("Your comments successful.");
        setComment(false);
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
    <section className="w-11/12 mx-auto my-10">
      <div>
        <div>
          <div>
            <img
              src={posts?.authorImage}
              alt="Author"
              className="object-cover object-center w-full rounded-md h-30 lg:h-72 bg-gray-500"
            />
          </div>
          <h2 className="text-xl font-bold font-poppins mt-3">{posts.title}</h2>
          <div className="flex items-center gap-2 justify-between">
            <p className="text-sm text-gray-500 font-poppins">
              by {posts.authorName}
            </p>
            <p className="text-sm text-gray-400 font-poppins">
              {new Date(posts?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {posts.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-accent-content text-center px-3 hover:text-accent border rounded-full translate-all duration-300"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="my-4 text-base text-gray-700">{posts?.description}</p>

        <div className="flex gap-3 items-center justify-between">
          <div className="flex gap-3 items-center">
            <button
              className="flex items-center gap-2 font-semibold"
              onClick={() => voteMutation.mutate("up")}
            >
              <AiFillLike className="text-blue-500 cursor-pointer" size={28} />{" "}
              {posts?.upVote}
            </button>
            /
            <button
              className="flex items-center gap-2 font-semibold"
              onClick={() => voteMutation.mutate("down")}
            >
              {posts?.downVote}
              <BiSolidDislike
                className="text-blue-500 cursor-pointer"
                size={28}
              />{" "}
            </button>
            <button onClick={() => setComment(!comment)}>
              <FaCommentAlt
                className="text-blue-500 cursor-pointer"
                size={28}
              />
            </button>
          </div>
          {/*  */}
          <div className="flex gap-3">
            <FacebookShareButton
              url={`${import.meta.env.VITE_SERVER_URL}/postDetails/${id}`}
              quote={posts?.title}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <WhatsappShareButton
              url={`${import.meta.env.VITE_SERVER_URL}/postDetails/${id}`}
              quote={posts?.title}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>

        {/* comment */}
        <div className="mt-6">
          {comment ? (
            <div className="mb-4 flex items-center gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className=" input input-bordered resize-none max-w-4xl w-full h-10"
                placeholder="Write a comment..."
              ></input>
              <button
                onClick={() => commentMutation?.mutate()}
                disabled={!commentText?.trim()}
                className="btn btn-primary "
              >
                Comment
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="space-y-4">
            {comments?.map((com) => (
              <div key={com?._id} className="bg-white p-3 rounded-md shadow-md">
                <div>
                  <div className="flex gap-2 items-center">
                    <img
                      alt="user photo"
                      src={com?.photo}
                      className="w-10 rounded-full"
                    />
                    <p className="font-poppins font-semibold mt-3">
                      {com?.name}
                    </p>
                  </div>
                </div>

                <p className="mt-3 font-roboto">{com?.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
