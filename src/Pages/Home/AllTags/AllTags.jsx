import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";

const AllTags = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tags = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allTags"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tags`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError)
    return <p className="text-center text-error mt-4">Failed to load tags.</p>;

  return (
    <div className="bg-base-200 my-10 py-8 px-4 md:px-12 rounded-lg">
      <h2 className="font-poppins text-xl md:text-2xl font-semibold text-primary mb-4 text-center">
        Explore by Tags
      </h2>

      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <span
            key={tag._id}
            className="badge badge-outline badge-primary hover:badge-accent transition-all cursor-pointer"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AllTags;
