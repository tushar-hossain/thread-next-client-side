import BannerSection from "./Banner/BannerSection";
import Features from "./Feature/Feature";
import PostList from "./PostList/PostList";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section>
        <BannerSection />
      </section>

      {/* post list */}
      <section className="w-11/12 mx-auto">
        <PostList />
      </section>

      <search>
        <Features />
      </search>
    </div>
  );
};

export default Home;
