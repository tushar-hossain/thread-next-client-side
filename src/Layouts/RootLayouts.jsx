import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const RootLayouts = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-313px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
