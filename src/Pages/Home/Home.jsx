import CallToAction from "../CallToAction/CallToAction";
import QuickStats from "../QuickStats/QuickStats";
import WhyChooseThreadNest from "../WhyChooseThreadNest/WhyChooseThreadNest";
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

      {/* Quick Stats */}
      <QuickStats />

      {/* Why Choose section */}
      <section>
        <WhyChooseThreadNest />
      </section>

      {/* post list */}
      <section className="w-11/12 mx-auto">
        <PostList />
      </section>

      {/* Features Section */}
      <search>
        <Features />
      </search>

      {/* call to action */}
      <section>
        <CallToAction />
      </section>
    </div>
  );
};

export default Home;
