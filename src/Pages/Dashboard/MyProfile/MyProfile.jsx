import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { FaMedal } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  console.log(profile);

  return (
    <div>
      <div className="text-center">
        <img
          src={profile?.image}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover mx-auto"
        />
        <div>
          <h2 className="text-xl font-bold font-poppins">{profile?.name}</h2>
          <p className="text-gray-500">{profile.email}</p>
          {/* Badge */}
          {profile.badge === "gold" && (
            <div className="mt-2 badge badge-warning text-white flex items-center gap-1 mx-auto">
              <FaMedal size={20} />
              <span className="text-sm text-gray-500">Gold Badge</span>
            </div>
          )}
          {profile?.badge === "bronze" && (
            <div className="mt-2 badge badge-accent flex items-center gap-1 mx-auto">
              <FaMedal size={20} />
              <span className="text-sm text-gray-500">Bronze Badge</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
