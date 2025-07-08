import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Registration = () => {
  const [eye, setEye] = useState(false);
  return (
    <div className="py-10">
      <div className="flex flex-col max-w-md mx-auto p-10 space-y-2 text-center bg-[#111827] text-gray-50 rounded-lg">
        <h1 className="text-xl md:text-3xl font-semibold">
          Register in your account
        </h1>
        <form className="space-y-2">
          <div className="flex flex-col">
            {/* name */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="rounded-t-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
            </div>
            {/* email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
            </div>
            {/* password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Photo
              </label>
              <input
                id="password"
                type={eye ? "text" : "password"}
                placeholder="Password"
                className="border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
              <p
                onClick={() => setEye(!eye)}
                className=" absolute text-black top-4 right-4"
              >
                {eye ? <FaEyeSlash /> : <FaEye />}
              </p>
            </div>
            {/* photo */}
            <div>
              <label htmlFor="photo" className="sr-only">
                Photo
              </label>
              <input
                id="photo"
                type="file"
                placeholder="Your photo"
                className="rounded-b-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
            </div>
          </div>

          <input
            className="btn bg-blue-500 hover:bg-blue-600 text-white rounded w-full"
            type="submit"
            value="Sign in"
          />
        </form>
        <div className="divider">OR</div>
        {/* Google */}
        <SocialLogin />
        <p className="text-xs text-center sm:px-6 dark:text-white">
          Already have an account?{" "}
          <Link to="/joinUs" className=" underline font-bold">
            Join Us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
