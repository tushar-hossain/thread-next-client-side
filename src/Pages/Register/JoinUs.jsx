import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const JoinUs = () => {
  const [eye, setEye] = useState(false);
  const { setUser, loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful");
        navigate(location.state || "/");
      })
      .catch(() => toast.error("Login failed"));
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Join Us - ThredNest</title>
      </Helmet>
      <div className="flex flex-col max-w-md mx-auto p-8 space-y-6 text-center bg-slate-800 text-slate-50 rounded-xl shadow-xl border border-slate-700">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Welcome Back
          </h1>
          <p className="text-slate-300 text-sm">
            Sign in to your ThredNest account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2 text-left">
            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-200"
              >
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="Enter your email"
                className="rounded-lg border border-slate-600 px-4 py-3 w-full bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span className="text-xs">⚠️</span>
                  Email is required
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  {...register("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="Enter your password"
                  className="rounded-lg border border-slate-600 px-4 py-3 w-full bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setEye(!eye)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400 transition-colors"
                >
                  {eye ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span className="text-xs">⚠️</span>
                  Password is required
                </p>
              )}
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center text-sm text-slate-300">
              <input
                type="checkbox"
                className="mr-2 accent-sky-500 bg-slate-700 border-slate-600"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-slate-800 text-slate-400">
              or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <SocialLogin />

        {/* Sign up link */}
        <p className="text-sm text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:text-sky-300 font-semibold transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
