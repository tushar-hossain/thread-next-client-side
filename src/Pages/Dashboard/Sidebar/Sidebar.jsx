import React from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import { NavLink } from "react-router";
import { FaUser, FaPlus, FaClipboardList, FaHome } from "react-icons/fa";
import useUserRole from "../../../hooks/useUserRole";
import { FaUserCog, FaFlag, FaBullhorn } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../../../../public/logo-tn.png";
import logoText from "../../../assets/image/logo-text.png";

const Sidebar = () => {
  const { role, authLoading } = useUserRole();

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
        <ul className="menu bg-primary text-white min-h-full w-60 p-4">
          {/* Sidebar content here */}

          <div className="mb-10">
            <NavLink to="/">
              <div className="flex items-center gap-1 -px-3">
                <img
                  className="w-15 h-15 rounded-full hidden md:block"
                  src={logo}
                  alt="brand logo"
                />
                <img className="w-40" src={logoText} alt="brand text" />
              </div>
            </NavLink>
          </div>

          {role === "user" && !authLoading && (
            <>
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
            </>
          )}

          {/* admin role */}
          {role === "admin" && !authLoading && (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className="btn btn-ghost w-full justify-start gap-2"
                >
                  <MdAdminPanelSettings />
                  Admin Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="btn btn-ghost w-full justify-start gap-2"
                >
                  <FaUserCog />
                  Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/adminReportedComments"
                  className="btn btn-ghost w-full justify-start gap-2"
                >
                  <FaFlag />
                  Reported Comments
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/admin-announcement"
                  className="btn btn-ghost w-full justify-start gap-2"
                >
                  <FaBullhorn />
                  Make Announcement
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
