import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { Link } from "react-router";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import Pagination from "../../Shared/Pagination";

const PostList = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page, sortBy],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/posts?page=${page}&limit=${limit}&sort=${sortBy}`
      );
      return data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center mt-5 text-red-500">Failed to load posts.</p>
    );

  const { posts, total } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="my-10 bg-slate-50 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-poppins text-sky-500">
          All Posts
        </h2>

        {/* Sort buttons with consistent sky-500 primary color */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("newest")}
            className={`btn border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors ${
              sortBy === "newest"
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`btn border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors ${
              sortBy === "popular"
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white"
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="card bg-white shadow-md p-5 border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <div className="mb-3">
              <img
                className="object-cover object-center w-full rounded-t-md h-35 mb-2"
                src={post.authorImage}
                alt="Author"
              />
              <div>
                <h3 className="font-semibold text-center text-slate-800">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 text-center">
                  {post.authorName}
                </p>
              </div>
            </div>

            {/* Tags with consistent primary color */}
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge badge-outline border-sky-500 text-sky-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Vote count with consistent colors */}
            <div className="flex justify-between items-center text-sm flex-1 mt-3">
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-slate-600">
                  <span className="flex items-center gap-1">
                    <BiSolidLike className="text-emerald-500" size={20} />
                    {post.upVote}
                  </span>
                  /
                  <span className="flex items-center gap-1">
                    {post.downVote}
                    <BiSolidDislike className="text-red-500" size={20} />
                  </span>
                </span>
              </div>
              <span className="text-sm text-slate-600 font-medium">
                Total: {post.upVote - post.downVote}
              </span>
            </div>

            {/* View details button with primary color */}
            <div className="mt-4">
              <Link
                to={`postDetails/${post?._id}`}
                className="btn bg-sky-500 hover:bg-sky-600 text-white w-full border-sky-500 hover:border-sky-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default PostList;
