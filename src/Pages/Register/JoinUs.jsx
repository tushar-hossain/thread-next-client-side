import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";

const JoinUs = () => {
  const [eye, setEye] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="py-10">
      <div className="flex flex-col max-w-md mx-auto p-10 space-y-2 text-center bg-[#111827] text-gray-50 rounded-lg">
        <h1 className="text-xl md:text-3xl font-semibold">
          Sign in your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col">
            {/* email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="Email address"
                className="rounded-t-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email name is required</p>
            )}

            {/* password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={eye ? "text" : "password"}
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
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
            {errors.password && (
              <p className="text-red-500 text-sm">Password field is required</p>
            )}
          </div>
          {/* forgot password */}
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
        <SocialLogin />
        <p className="text-xs text-center sm:px-6 dark:text-white">
          Don't have an account?{" "}
          <Link to="/register" className=" underline font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinUs;
