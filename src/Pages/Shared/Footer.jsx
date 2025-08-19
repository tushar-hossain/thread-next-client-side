
import { Link, NavLink } from "react-router";
import logo from "../../assets/image/logo-tn.png";

const Footer = () => {
  return (
    <div className="bg-sky-500 text-white">
      <footer className="w-11/12 mx-auto divide-y divide-sky-400">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          {/* Logo Section */}
          <div className="lg:w-1/3">
            <Link to="/" className="flex items-center space-x-2 group">
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
            <p className="mt-4 text-sky-100 text-sm leading-relaxed max-w-xs">
              Join our community to share ideas, connect with others, and
              discover amazing content.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 text-sm gap-x-6 gap-y-8 lg:w-2/3 sm:grid-cols-4">
            {/* Category Links */}
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase font-semibold text-white">
                Category
              </h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="membership"
                    className="text-sky-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Membership
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="announcement"
                    className="text-sky-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Announcement
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="faqs"
                    className="text-sky-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    FAQ
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase font-semibold text-white">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="privacy"
                    className="text-sky-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Privacy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="terms"
                    className="text-sky-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    Terms of Service
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h3 className="uppercase font-semibold text-white">
                Social Media
              </h3>
              <div className="flex justify-start space-x-3">
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/"
                  title="Facebook"
                  className="flex items-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current text-white"
                  >
                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://x.com/"
                  title="Twitter"
                  className="flex items-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  target="_blank"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current text-white"
                  >
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                  </svg>
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/"
                  title="LinkedIn"
                  className="flex items-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current text-white"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-3">
              <h3 className="uppercase font-semibold text-white">Contact</h3>
              <div className="flex flex-col space-y-2 text-sky-100">
                <p className="font-medium text-white">Thread Nest</p>
                <p>Dhaka, Bangladesh</p>
                <a
                  href="mailto:support@threadnest.com"
                  className="hover:text-white transition-colors duration-200 hover:underline"
                >
                  support@threadnest.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-6 text-sm text-center">
          <p className="text-sky-100">
            © {new Date().getFullYear()} Thread Nest. All rights reserved.
          </p>
          <p className="text-sky-200 mt-1 text-xs">
            Built with ❤️ for the community
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
