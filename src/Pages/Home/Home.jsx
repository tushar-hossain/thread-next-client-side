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

      {/* all post */}
      <section>
        <AllTags />
      </section>

      {/* post list */}
      <section>
        <PostList />
      </section>
    </div>
  );
};

export default Home;
