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
import { Helmet } from "react-helmet-async";

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
    <section className="w-11/12 mx-auto my-10 bg-slate-50 p-6 rounded-lg">
      <Helmet>
        <title>Post Details</title>
      </Helmet>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Post Header */}
        <div className="mb-6">
          <div className="mb-4">
            <img
              src={posts?.authorImage}
              alt="Author"
              className="object-cover object-center mx-auto rounded-md h-30 lg:h-72 bg-slate-300 border border-slate-200"
            />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold font-poppins mt-3 text-slate-800">
            {posts.title}
          </h2>

          <div className="flex items-center gap-2 justify-between mt-2">
            <p className="text-sm text-slate-600 font-poppins">
              by{" "}
              <span className="font-semibold text-sky-500">
                {posts.authorName}
              </span>
            </p>
            <p className="text-sm text-slate-500 font-poppins">
              {new Date(posts?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
          {posts.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-sky-50 text-sky-600 border border-sky-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-sky-100 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="my-6 text-base text-slate-700 leading-relaxed">
          {posts?.description}
        </p>

        {/* Voting and Share Section */}
        <div className="flex gap-6 items-center justify-between py-4 border-t border-slate-200">
          <div className="flex gap-4 items-center">
            {/* Upvote Button */}
            <button
              className="flex items-center gap-2 font-semibold text-slate-700 hover:text-emerald-500 transition-colors"
              onClick={() => voteMutation.mutate("up")}
            >
              <AiFillLike
                className="text-emerald-500 cursor-pointer hover:text-emerald-600"
                size={28}
              />
              <span>{posts?.upVote}</span>
            </button>

            <span className="text-slate-400">/</span>

            {/* Downvote Button */}
            <button
              className="flex items-center gap-2 font-semibold text-slate-700 hover:text-red-500 transition-colors"
              onClick={() => voteMutation.mutate("down")}
            >
              <span>{posts?.downVote}</span>
              <BiSolidDislike
                className="text-red-500 cursor-pointer hover:text-red-600"
                size={28}
              />
            </button>

            {/* Comment Toggle Button */}
            <button
              onClick={() => setComment(!comment)}
              className="ml-2 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <FaCommentAlt
                className={`cursor-pointer transition-colors ${
                  comment ? "text-sky-500" : "text-slate-500 hover:text-sky-500"
                }`}
                size={24}
              />
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="flex gap-3">
            <FacebookShareButton
              url={`https://thread-nest-2b0d5.web.app/postDetails/${id}`}
              quote={posts?.title}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <WhatsappShareButton
              url={`https://thread-nest-2b0d5.web.app/postDetails/${id}`}
              quote={posts?.title}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </div>

        {/* Comment Input Section */}
        <div className="mt-6">
          {comment && (
            <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="input input-bordered border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 resize-none flex-1 h-12"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={() => commentMutation?.mutate()}
                  disabled={!commentText?.trim()}
                  className="btn bg-sky-500 hover:bg-sky-600 text-white border-sky-500 hover:border-sky-600 disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-500"
                >
                  Comment
                </button>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Comments ({comments?.length || 0})
            </h3>

            {comments?.map((com) => (
              <div
                key={com?._id}
                className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-3 items-start">
                  <img
                    alt="user photo"
                    src={com?.photo}
                    className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div className="flex-1">
                    <p className="font-poppins font-semibold text-slate-800">
                      {com?.name}
                    </p>
                    <p className="mt-2 font-roboto text-slate-700 leading-relaxed">
                      {com?.text}
                    </p>
                  </div>
                </div>
              </div>
            )) || (
              <p className="text-center text-slate-500 py-8">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
