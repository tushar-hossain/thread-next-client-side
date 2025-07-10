import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";

const BannerSection = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const axiosSecure = useAxiosSecure();

  const {
    mutate: searchPosts,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (tag) => {
      const res = await axiosSecure.get(`/posts/search?tag=${tag}`);
      return res.data;
    },
    onSuccess: (data) => {
      setSearchResult(data);
    },
  });

  console.log(searchResult);

  const handelSearch = (e) => {
    e.preventDefault();
    if (searchItem.trim()) {
      searchPosts(searchItem);
    }
  };

  return (
    <div className="bg-base-200 my-10 py-8 px-4 md:px-12 rounded-lg">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-primary font-poppins">
          Find Posts by Tag
        </h1>
        <p className="font-roboto text-gray-500 mb-2">
          Search posts using keywords from available tags
        </p>
      </div>

      {/* search form */}
      <form onSubmit={handelSearch} className="max-w-xl mx-auto flex gap-2">
        <input
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          type="text"
          className="input input-bordered w-full"
          placeholder="Search by tag"
        />
        <button
          type="submit"
          className="btn bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* error message */}
      <div className="mt-10 max-w-4xl mx-auto">
        {isPending && <Loading />}
        {isError && (
          <p className="text-center text-error">
            Failed to load results: {error.message}
          </p>
        )}

        {!isPending && !isError && searchResult.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {searchResult.map((post) => (
              <div key={post._id} className="bg-base-100 p-3 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={post.authorImage}
                    alt="Author"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="font-bold font-poppins">{post.title}</h2>
                    <p className="text-sm text-gray-500">
                      by {post.authorName}
                    </p>
                  </div>
                </div>
                {/* tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="badge badge-accent">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* date */}
                <div className="mt-2 text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
                {/* vote */}
                <div className="flex items-center justify-between">
                  <span className="flex justify-between items-center mt-3 text-sm gap-2 cursor-pointer">
                    <AiFillLike size={20} /> {post.upVote} /{" "}
                    <BiSolidDislike size={20} /> {post.downVote}
                  </span>
                  <span className="flex items-center gap-2 mt-3 cursor-pointer">
                    <FaComment size={20} /> {post.commentCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* no post message */}
        {searchResult.length === 0 && (
          <p className="text-center text-gray-500 font-roboto">
            No posts found for tag.
          </p>
        )}
      </div>
    </div>
  );
};

export default BannerSection;
