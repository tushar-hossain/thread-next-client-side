import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="flex flex-col max-w-md mx-auto p-8 space-y-6 text-center bg-slate-800 text-slate-50 rounded-xl shadow-xl border border-slate-700">
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
