import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { Link } from "react-router";

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
    <div className="my-10 bg-base-200 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-poppins text-primary">
          All Posts
        </h2>
        {/* button sort data newest and popular */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("newest")}
            className={`btn btn-sm ${
              sortBy === "newest" ? "btn-primary" : "btn-outline"
            } `}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`btn btn-sm ${
              sortBy === "popular" ? "btn-primary" : "btn-outline"
            } `}
          >
            Popular
          </button>
        </div>
      </div>

      {/* showing posts here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {posts.map((post) => (
          <div key={post._id} className=" card bg-base-300 shadow-md p-5">
            <div className=" mb-3">
              <img
                className="w-25 h-25 mx-auto rounded-lg mb-3"
                src={post.authorImage}
                alt="Author"
              />
              <div>
                <h3 className="font-semibold text-center">{post.title}</h3>
                <p className="text-sm text-gray-500 text-center">
                  {post.authorName}
                </p>
              </div>
            </div>
            {/* tags */}
            {/* <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="badge badge-outline badge-primary">
                  {tag}
                </span>
              ))}
            </div> */}

            <div className="text-sm text-gray-500 mb-2">
              {new Date(post.createdAt).toLocaleString()}
            </div>

            {/* vote count  */}
            <div className="flex justify-between items-center text-sm text-gray-600 flex-1">
              <div className="flex gap-3">
                <span>{post.commentCount}</span>
                <span>
                  {post.upVote} / {post.downVote}
                </span>
              </div>
              <span className="font-semibold">
                Total Votes: {post.upVote - post.downVote}
              </span>
            </div>

            {/* view details page link */}
            <div className="mt-4 text-right">
              <Link
                to={`postDetails/${post?._id}`}
                className="btn btn-sm btn-outline btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => setPage(index + 1)}
            key={index}
            className={`btn bg-blue-500 hover:bg-blue-600 text-white rounded ${
              page === index + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
