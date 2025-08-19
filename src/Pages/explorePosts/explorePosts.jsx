import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaFire, FaTags } from "react-icons/fa";

const Explore = () => {
  const [search, setSearch] = useState("");

  // Dummy explore data (replace with your API call)
  const explorePosts = [
    {
      id: 1,
      title: "How to Get Started with React",
      description:
        "A beginner-friendly guide to building your first React app.",
      tag: "React",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Mastering MongoDB Queries",
      description: "Tips and tricks for writing efficient MongoDB queries.",
      tag: "MongoDB",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Express.js Best Practices",
      description: "Improve your Express.js applications with these patterns.",
      tag: "Express",
      author: "David Lee",
    },
  ];

  const filteredPosts = explorePosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Explore | ThreadNest</title>
      </Helmet>

      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-poppins">
          Explore <span className="text-sky-500">ThreadNest</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Discover trending discussions, search by keywords, or explore by
          categories. Stay updated with the latest posts from the community.
        </p>
      </section>

      {/* Search Bar */}
      <div className="flex items-center bg-white border rounded-lg shadow-md p-2 mb-8 max-w-lg mx-auto">
        <FaSearch className="text-gray-500 ml-2" />
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 outline-none"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button className="px-4 py-2 bg-sky-100 text-sky-600 rounded-full font-medium hover:bg-sky-200 flex items-center gap-2">
          <FaFire /> Trending
        </button>
        <button className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-full font-medium hover:bg-emerald-200 flex items-center gap-2">
          <FaTags /> React
        </button>
        <button className="px-4 py-2 bg-fuchsia-100 text-fuchsia-600 rounded-full font-medium hover:bg-fuchsia-200 flex items-center gap-2">
          <FaTags /> Express
        </button>
        <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-medium hover:bg-orange-200 flex items-center gap-2">
          <FaTags /> MongoDB
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg text-slate-800">{post.title}</h3>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {post.tag}
                </span>
                <span>By {post.author}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
