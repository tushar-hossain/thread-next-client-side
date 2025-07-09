import React, { useState } from "react";

const BannerSection = () => {
  const [searchItem, setSearchItem] = useState("");

  const handelSearch = (e) => {
    e.preventDefault();
    console.log(searchItem.trim());
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
    </div>
  );
};

export default BannerSection;
