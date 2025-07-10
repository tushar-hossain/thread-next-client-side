import React from "react";
import BannerSection from "./Banner/BannerSection";
import AllTags from "./AllTags/AllTags";

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
    </div>
  );
};

export default Home;
