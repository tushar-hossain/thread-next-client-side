import React from "react";
import BannerSection from "./Banner/BannerSection";
import AllTags from "./AllTags/AllTags";
import PostList from "./PostList/PostList";

const Home = () => {
  return (
    <div>
      <section>
        <BannerSection />
      </section>

      {/* post list */}
      <section className="w-11/12 mx-auto">
        <PostList />
      </section>
    </div>
  );
};

export default Home;
