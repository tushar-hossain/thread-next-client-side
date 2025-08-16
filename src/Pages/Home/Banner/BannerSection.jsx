import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { FaSearch, FaUser, FaEye, FaClock } from "react-icons/fa";
import { Link } from "react-router";
import AllTags from "../AllTags/AllTags";

const BannerSection = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
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
      setHasSearched(true);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchItem.trim()) {
      searchPosts(searchItem);
    }
  };

  const handleClearSearch = () => {
    setSearchItem("");
    setSearchResult([]);
    setHasSearched(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-8 px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Discover Amazing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            Posts
          </span>
        </h1>
        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
          Explore our community discussions by searching of posts using tags
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              type="text"
              className="w-full px-6 py-4 pl-12 pr-32 text-lg bg-white/10 backdrop-blur-sm border border-slate-600 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none transition-all duration-200"
              placeholder="Search posts by tags (e.g., technology, health, lifestyle)"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />

            {/* Search/Clear Button */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              {searchItem && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2 text-sm bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-all duration-200"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={!searchItem.trim() || isPending}
                className="px-6 py-2 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-transparent"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Search Stats */}
        {hasSearched && (
          <div className="mt-4 text-center">
            <p className="text-slate-300">
              Found{" "}
              <span className="font-semibold text-sky-400">
                {searchResult.length}
              </span>{" "}
              posts
              {searchItem && (
                <>
                  {" "}
                  for "
                  <span className="font-semibold text-sky-400">
                    {searchItem}
                  </span>
                  "
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* All Tags Component */}
      {/* <div className="">
        <AllTags setSearchItem={setSearchItem} />
      </div> */}

      {/* Results Section */}
      <div className="max-w-7xl mx-auto">
        {isPending && (
          <div className="flex justify-center items-center py-10">
            <Loading />
          </div>
        )}

        {isError && (
          <div className="text-center py-5">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 font-medium mb-2">Search Failed</p>
              <p className="text-red-300 text-sm">
                {error?.message || "Something went wrong"}
              </p>
            </div>
          </div>
        )}

        {!isPending && !isError && hasSearched && searchResult.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-slate-700/50 rounded-xl p-8 max-w-md mx-auto border border-slate-600">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-slate-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Posts Found
              </h3>
              <p className="text-slate-300 mb-4">
                We couldn't find any posts matching "{searchItem}". Try
                different tags or browse our popular topics below.
              </p>
              <button
                onClick={handleClearSearch}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {!isPending && !isError && searchResult.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold text-white">Search Results</h2>
              <button
                onClick={handleClearSearch}
                className="text-sky-400 hover:text-sky-300 text-sm underline transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResult.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  {/* Author Image */}
                  <div className="relative">
                    <img
                      src={post.authorImage}
                      alt={`${post.authorName}'s post`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          post.authorName
                        )}&background=0ea5e9&color=ffffff&size=400`;
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <FaClock size={10} />
                      <span>Recent</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors duration-200">
                      {post.title.length > 50
                        ? `${post.title.slice(0, 50)}...`
                        : post.title}
                    </h3>

                    {/* Author */}
                    <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                      <FaUser size={12} className="text-sky-500" />
                      <span>by {post.authorName}</span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {post.description.length > 80
                        ? `${post.description.slice(0, 80)}...`
                        : post.description}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-slate-500 text-xs px-2 py-1">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Votes */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <AiFillLike size={16} />
                          {post.upVote || 0}
                        </span>
                        <span className="flex items-center gap-1 text-red-500">
                          <BiSolidDislike size={16} />
                          {post.downVote || 0}
                        </span>
                      </div>
                    </div>

                    {/* Read More Button */}
                    <Link
                      to={`/postDetails/${post._id}`}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 flex items-center justify-center gap-2 group"
                    >
                      <FaEye size={14} />
                      <span>Read More</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Default State - No Search Yet */}
        {!hasSearched && !isPending && (
          <div className="text-center py-5">
            <div className="bg-slate-700/30 rounded-xl p-8 max-w-lg mx-auto border border-slate-600">
              <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Explore?
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Use the search bar above to find posts by tags, or click on any
                tag below to get started. Discover amazing content from our
                community!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setSearchItem("react")}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Try "react"
                </button>
                <button
                  onClick={() => setSearchItem("mongodb")}
                  className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Try "mongodb"
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerSection;
