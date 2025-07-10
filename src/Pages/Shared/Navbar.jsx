import React from "react";
import logo from "../../assets/image/logo-bird.png";
import logoText from "../../assets/image/logo-text.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();

  // logout user
  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Log-out successful"))
      .catch(() => toast.error("Logout failed"));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="membership">Membership</NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-base-300">
      <div className="w-11/12 mx-auto flex items-center p-0 py-3 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black"
            >
              {links}
            </ul>
          </div>
          {/* logo */}
          <Link to="/">
            <div className="flex items-center gap-1">
              <img
                className="w-15 h-15 rounded-full hidden md:block"
                src={logo}
                alt="brand logo"
              />
              <img className="w-48" src={logoText} alt="brand logo" />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-roboto text-black">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          {/* conditional rendering */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full border">
                  <img alt="user image" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black"
              >
                <li>
                  <p className="font-bold">{user?.displayName}</p>
                </li>
                <li>
                  <a>Dashboard</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/joinUs"
              className="btn bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Join Us
            </NavLink>
          )}

          {/* notification */}
          <button disabled={true} className="indicator ml-5 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs bg-red-500  indicator-item "></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
