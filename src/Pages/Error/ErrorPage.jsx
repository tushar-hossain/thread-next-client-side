import React from "react";
import { useRouteError } from "react-router";
import errorAnimation from "../../assets/lottieFile/error.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  <Helmet>
    <title>Error</title>
  </Helmet>;
  const error = useRouteError();
  return (
    <div>
      <Lottie
        className="w-11/12 mx-auto py-12"
        style={{ width: 400 }}
        animationData={errorAnimation}
      />

      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">
        {error.data}
      </h1>
    </div>
  );
};

export default ErrorPage;
