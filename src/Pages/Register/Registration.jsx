import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Registration = () => {
  const [eye, setEye] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const { setUser, createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  // Watch photo field to show preview
  const watchPhoto = watch("photo");
  React.useEffect(() => {
    if (watchPhoto && watchPhoto[0]) {
      const file = watchPhoto[0];
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [watchPhoto]);

  const onSubmit = async (data) => {
    const { photo, ...userInfo } = data;

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", photo[0]);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGB_API}`,
        formData
      );
      userInfo.photo = res.data.data.url;

      // Create user with Firebase
      const result = await createUser(userInfo.email, userInfo.password);

      // Save user info to backend
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

      // Update Firebase profile
      const userProfile = {
        displayName: userInfo.name,
        photoURL: userInfo.photo,
      };

      await updateUser(userProfile);
      setUser(result.user);
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Register - ThredNest</title>
      </Helmet>
      <div className="flex flex-col max-w-md mx-auto p-8 space-y-6 text-center bg-slate-800 text-slate-50 rounded-xl shadow-xl border border-slate-700">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Join ThredNest
          </h1>
          <p className="text-slate-300 text-sm">
            Create your account and start connecting
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-4 text-left">
            {/* Name */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-sm font-medium text-slate-200 flex items-center gap-2"
              >
                <FaUser className="text-sky-400" />
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                aria-invalid={errors.name ? "true" : "false"}
                className="rounded-lg border border-slate-600 px-4 py-3 w-full bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
              {errors.name && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span className="text-xs">⚠️</span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-200 flex items-center gap-2"
              >
                <FaEnvelope className="text-sky-400" />
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="Enter your email"
                className="rounded-lg border border-slate-600 px-4 py-3 w-full bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200"
              />
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <span className="text-xs">⚠️</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200 flex items-center gap-2"
              >
                <FaLock className="text-sky-400" />
                Password
              </label>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="Create a strong password"
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
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Photo Upload */}
            <div className="space-y-1">
              <label
                htmlFor="photo"
                className="text-sm font-medium text-slate-200 flex items-center gap-2"
              >
                <FaUpload className="text-sky-400" />
                Profile Photo
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", {
                    required: "Profile photo is required",
                    validate: {
                      fileSize: (files) => {
                        if (files[0] && files[0].size > 5 * 1024 * 1024) {
                          return "File size must be less than 5MB";
                        }
                        return true;
                      },
                    },
                  })}
                  aria-invalid={errors.photo ? "true" : "false"}
                  className="rounded-lg border border-slate-600 px-4 py-3 w-full bg-slate-700 text-slate-100 file:bg-sky-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:hover:bg-sky-600 transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />

                {/* Photo Preview */}
                {photoPreview && (
                  <div className="flex justify-center">
                    <div className="relative">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-sky-400"
                      />
                      <div className="absolute -top-1 -right-1 bg-sky-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        ✓
                      </div>
                    </div>
                  </div>
                )}

                {errors.photo && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <span className="text-xs">⚠️</span>
                    {errors.photo.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", {
                required: "You must agree to terms and conditions",
              })}
              className="mt-1 accent-sky-500 bg-slate-700 border-slate-600"
            />
            <label htmlFor="terms" className="text-slate-300 leading-relaxed">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-sky-400 hover:text-sky-300 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-sky-400 hover:text-sky-300 underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-400 text-sm flex items-center gap-1 -mt-2">
              <span className="text-xs">⚠️</span>
              {errors.terms.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
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

        {/* Sign in link */}
        <p className="text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            to="/joinUs"
            className="text-sky-400 hover:text-sky-300 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
