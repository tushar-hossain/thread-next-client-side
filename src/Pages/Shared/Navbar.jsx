import { useState } from "react";
import logo from "../../assets/image/logo-tn.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAnnouncement from "../../hooks/useAnnouncement";
import useUserRole from "../../hooks/useUserRole";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaTachometerAlt,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { announcements } = useAnnouncement();
  const { role } = useUserRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // logout user
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        setIsUserMenuOpen(false);
      })
      .catch(() => toast.error("Logout failed"));
  };

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/membership", label: "Membership" },
    { to: "/announcement", label: "Announcements" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/explore", label: "Explore" },
  ];

  const NavLinks = ({ mobile = false, onClick = () => {} }) => (
    <>
      {navigationLinks.map((link) => (
        <li key={link.to} className={mobile ? "w-full" : ""}>
          <NavLink
            to={link.to}
            onClick={onClick}
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                mobile
                  ? `block w-full text-left ${
                      isActive
                        ? "bg-sky-500 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  : `${
                      isActive
                        ? "text-sky-300 bg-slate-700/50"
                        : "text-slate-200 hover:text-sky-300 hover:bg-slate-700/30"
                    }`
              }`
            }
          >
            {link.label}
            {/* Active indicator for desktop */}
            {!mobile && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            )}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-slate-800 sticky top-0 z-50 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-sky-400 hover:bg-slate-700 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={20} />
                ) : (
                  <FaBars size={20} />
                )}
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  className="w-10 h-10 rounded-full hidden md:block transition-transform duration-200 group-hover:scale-110"
                  src={logo}
                  alt="ThredNest Logo"
                />
                <div className="h-8 transition-transform duration-200 group-hover:scale-105">
                  <h1 className="text-2xl text-white font-semibold">
                    Thread Nest
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <ul className="flex items-center space-x-1">
                <NavLinks />
              </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              {announcements.length > 0 && (
                <div className="relative">
                  <button
                    className="p-2 rounded-lg text-slate-300 hover:text-sky-400 hover:bg-slate-700 transition-all duration-200 relative"
                    title="Notifications"
                  >
                    <FaBell size={18} />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {announcements.length > 9 ? "9+" : announcements.length}
                    </span>
                  </button>
                </div>
              )}

              {/* User Section */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg text-slate-300 hover:text-sky-400 hover:bg-slate-700 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-slate-600 overflow-hidden">
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.displayName || `${role}`
                          )}&background=0ea5e9&color=ffffff`;
                        }}
                      />
                    </div>
                    <span className="hidden md:block text-sm font-medium max-w-24 truncate">
                      {user?.displayName}
                    </span>
                    <FaChevronDown
                      size={12}
                      className={`transform transition-transform duration-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-slate-200">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user?.email}
                        </p>
                        {role && (
                          <span className="inline-block mt-1 px-2 py-1 bg-sky-100 text-sky-800 text-xs rounded-full font-medium">
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        )}
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <Link
                          to={
                            role === "admin"
                              ? "/dashboard/admin-profile"
                              : "/dashboard/profile"
                          }
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                        >
                          <FaTachometerAlt className="text-sky-500" />
                          <span>Dashboard</span>
                        </Link>

                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-200"
                        >
                          <FaUser className="text-sky-500" />
                          <span>Profile</span>
                        </Link>
                      </div>

                      <div className="border-t border-slate-200 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors duration-200"
                        >
                          <FaSignOutAlt />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/joinUs"
                  className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-105"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          <ul className="space-y-1">
            <NavLinks
              mobile={true}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </ul>

          {/* Mobile User Info */}
          {user && (
            <div className=" hidden pt-4 border-t border-slate-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 rounded-full border-2 border-slate-200 overflow-hidden">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.displayName || "User"
                      )}&background=0ea5e9&color=ffffff`;
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  to={
                    role === "admin"
                      ? "/dashboard/admin-profile"
                      : "/dashboard/profile"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                >
                  <FaTachometerAlt className="text-sky-500" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition-colors duration-200"
                >
                  <FaSignOutAlt />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handler for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
