import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";

const AllTags = ({ setSearchItem }) => {
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
    <div className="max-w-2xl mx-auto py-3 px-4 md:px-12 rounded-lg text-white">
      <div className="flex flex-wrap justify-center gap-3 text-white">
        {tags.map((tag) => (
          <span
            key={tag._id}
            onClick={() => {
              setSearchItem(tag.name);
            }}
            className="cursor-pointer text-white text-center px-3 hover:text-accent border rounded-full translate-all duration-300"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AllTags;
