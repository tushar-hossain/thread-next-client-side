import React from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import { NavLink } from "react-router";
import { FaUser, FaPlus, FaClipboardList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        {/* Page content here */}
        <DashboardNavbar drawer={"my-drawer"} />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
          {/* Sidebar content here */}
          <li className="mb-10 text-2xl font-semibold font-poppins">
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className="btn btn-ghost w-full justify-start gap-2"
            >
              {" "}
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-post"
              className="btn btn-ghost w-full justify-start gap-2"
            >
              <FaPlus /> Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-posts"
              className="btn btn-ghost w-full justify-start gap-2"
            >
              {" "}
              <FaClipboardList />
              My Posts
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
