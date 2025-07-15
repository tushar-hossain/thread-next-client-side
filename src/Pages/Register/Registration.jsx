import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  <Helmet>
    <title>Register</title>
  </Helmet>;
  const [eye, setEye] = useState(false);
  const { setUser, createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // react form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // submit form data
  const onSubmit = async (data) => {
    const { photo, ...userInfo } = data;

    const formData = new FormData();
    formData.append("image", photo[0]);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGB_API}`,
      formData
    );
    userInfo.photo = res.data.data.url;

    // create user
    createUser(userInfo.email, userInfo.password)
      .then(async (result) => {
        // backend post user info
        const usersInfo = {
          name: data.name,
          email: data.email,
          image: res.data.data.url,
        };

        const userRes = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users`,
          usersInfo
        );

        if (userRes.data.insertedId) {
          toast.success("Registration successful");
        }

        // update profile in the firebase
        const userProfile = {
          displayName: userInfo.name,
          photoURL: userInfo.photo,
        };
        updateUser(userProfile)
          .then(() => {
            setUser(result.user);
            navigate(location.state || "/");
          })
          .catch(() => {});
      })
      .catch(() => toast.error("Registration failed"));
  };

  return (
    <div className="py-10">
      <div className="flex flex-col max-w-md mx-auto p-10 space-y-2 text-center bg-[#111827] text-gray-50 rounded-lg">
        <h1 className="text-xl md:text-3xl font-semibold">
          Register in your account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col">
            {/* name */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
                className="rounded-t-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

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
                className="border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Photo
              </label>
              <input
                type={eye ? "text" : "password"}
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
                placeholder="Password"
                className="border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
              <p
                onClick={() => setEye(!eye)}
                className=" absolute text-black top-4 right-4"
              >
                {eye ? <FaEyeSlash /> : <FaEye />}
              </p>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
            </div>
            {/* photo */}
            <div>
              <label htmlFor="photo" className="sr-only">
                Photo
              </label>
              <input
                type="file"
                placeholder="Your photo"
                {...register("photo", { required: true })}
                aria-invalid={errors.photo ? "true" : "false"}
                className="rounded-b-md border px-2 focus:ring-2 w-full py-2 bg-gray-50 text-black"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500 text-sm">Photo is required</p>
              )}
            </div>
          </div>

          <input
            className="btn bg-blue-500 hover:bg-blue-600 text-white rounded w-full"
            type="submit"
            value="Register"
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
