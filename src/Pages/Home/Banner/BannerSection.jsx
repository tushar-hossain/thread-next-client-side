import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { Link } from "react-router";
import AllTags from "../AllTags/AllTags";

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

  const handelSearch = (e) => {
    e.preventDefault();
    if (searchItem.trim()) {
      searchPosts(searchItem);
    }
  };

  return (
    <div className="bg-primary py-8 px-4 md:px-12">
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-primary font-poppins">
          Find Posts by Tag
        </h1>
        <p className="font-roboto text-gray-200 mb-2">
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

      {/* all tags */}
      <AllTags setSearchItem={setSearchItem} />

      {/* error message */}
      <div className="mt-10 max-w-4xl mx-auto">
        {isPending && <Loading />}
        {isError && (
          <p className="text-center text-error">
            Failed to load results: {error.message}
          </p>
        )}

        {!isPending && !isError && searchResult.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4">
            {searchResult.map((post) => (
              <div key={post._id} className="bg-base-100 rounded-lg ">
                <div className="mb-2">
                  <img
                    src={post.authorImage}
                    alt="Author"
                    className="object-cover object-center w-full rounded-t-md h-30 mb-2"
                  />
                  <div className="text-center">
                    <h2 className="font-bold font-poppins">
                      {post.title.slice(0, 15)}...
                    </h2>
                    <p className="text-sm text-gray-500">
                      by {post.authorName}
                    </p>
                  </div>
                </div>
                {/* tags */}
                {/* <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="badge badge-accent">
                      {tag}
                    </span>
                  ))}
                </div> */}
                {/* description */}
                <div className="mt-2 text-sm px-4">
                  <span>{post.description.slice(0, 20)}...</span>
                </div>
                {/* vote */}
                <div className="flex items-center justify-between px-4">
                  <span className="flex justify-between items-center mt-3 text-sm gap-2 cursor-pointer">
                    <AiFillLike size={20} className="text-blue-600" />{" "}
                    {post.upVote} / {post.downVote}{" "}
                    <BiSolidDislike size={20} className="text-blue-600" />
                  </span>
                </div>
                <Link
                  to={`/postDetails/${post._id}`}
                  className="btn  bg-blue-500 hover:bg-blue-600 text-white rounded mt-3 w-full"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* no post message */}
        {searchResult.length === 0 ? (
          <p className="text-center text-gray-500 font-roboto">
            No posts found for tag.
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BannerSection;
