import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const JoinUs = () => {
  const [eye, setEye] = useState(false);

  return (
    <div className="py-10">
      <div className="flex flex-col max-w-md mx-auto p-10 space-y-2 text-center bg-[#111827] text-gray-50 rounded-lg">
        <h1 className="text-xl md:text-3xl font-semibold">
          Sign in your account
        </h1>
        <form className="space-y-2">
          <div className="flex flex-col">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="rounded-t-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
            </div>
            <div className="relative">
              <input
                id="password"
                type={eye ? "text" : "password"}
                placeholder="Password"
                className="rounded-b-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
              <p
                onClick={() => setEye(!eye)}
                className=" absolute text-black top-4 right-4"
              >
                {eye ? <FaEyeSlash /> : <FaEye />}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center"></div>
            <Link className="text-sm text-gray-50">Forgot your password?</Link>
          </div>

          <input
            className="btn bg-blue-500 hover:bg-blue-600 text-white rounded w-full"
            type="submit"
            value="Sign in"
          />
        </form>
        <div className="divider">OR</div>
        {/* Google */}
        <button className="btn bg-blue-500 hover:bg-blue-600 text-white rounded w-full">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <p className="text-xs text-center sm:px-6 dark:text-white">
          Don't have an account?{" "}
          <Link to="/registration" className=" underline font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
