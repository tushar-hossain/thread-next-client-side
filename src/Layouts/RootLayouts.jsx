import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const RootLayouts = () => {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto min-h-[calc(100vh-370px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayouts;
