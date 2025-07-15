import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { Link } from "react-router";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

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
            className={`hover:bg-blue-600 ${
              sortBy === "newest"
                ? "btn bg-blue-500 btn-outline text-white"
                : "btn bg-blue-500 btn-outline"
            } `}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`hover:bg-blue-600 ${
              sortBy === "popular"
                ? "btn bg-blue-500 btn-outline text-white"
                : "btn bg-blue-500 btn-outline"
            } `}
          >
            Popular
          </button>
        </div>
      </div>

      {/* showing posts here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {posts.map((post) => (
          <div key={post._id} className=" card bg-white shadow-md p-5">
            <div className="mb-3">
              <img
                className="object-cover object-center w-full rounded-t-md h-30 mb-2"
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
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="badge badge-outline badge-primary">
                  {tag}
                </span>
              ))}
            </div>

            {/* vote count  */}
            <div className="flex justify-between items-center text-sm flex-1 mt-3">
              <div className="flex gap-3">
                <span className="flex items-center gap-1">
                  <span>
                    <BiSolidLike className="inline text-blue-500" size={20} />{" "}
                    {post.upVote}
                  </span>{" "}
                  /
                  <span>
                    {post.downVote}{" "}
                    <BiSolidDislike
                      className="inline text-blue-500"
                      size={20}
                    />
                  </span>
                </span>
              </div>
              <span className="text-sm">
                Total Votes {post.upVote - post.downVote}
              </span>
            </div>

            {/* view details page link */}
            <div className="mt-4 text-right">
              <Link
                to={`postDetails/${post?._id}`}
                className="btn bg-blue-500 hover:bg-blue-600 text-white w-full"
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
