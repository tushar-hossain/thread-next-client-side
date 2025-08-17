import React from "react";
import { Link, useRouteError } from "react-router";
import errorAnimation from "../../assets/lottieFile/error.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <Lottie
        className="w-11/12 mx-auto py-12"
        style={{ width: 400 }}
        animationData={errorAnimation}
      />

      <Link className="flex items-center justify-center" to={"/"}>
        <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 w-fit">
          Go to Home
        </button>
      </Link>

      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
        {error.data}
      </h1>
    </div>
  );
};

export default ErrorPage;
