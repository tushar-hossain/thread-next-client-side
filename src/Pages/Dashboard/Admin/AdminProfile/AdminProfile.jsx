import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaMedal } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user.email}`);
      return data;
    },
  });

  const { data: recentPosts = [] } = useQuery({
    queryKey: ["recentPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/recent?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

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
          {profile?.badge === "gold" && (
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
      {/*  */}
      <div>
        <h3 className="text-lg font-semibold mb-2">My Recent Posts</h3>
        <ul className="space-y-3">
          {recentPosts?.map((post) => (
            <li key={post?._id} className="p-4 border rounded">
              <h4 className="font-semibold">{post?.title}</h4>
              <p className="text-sm text-gray-500">{post?.tags?.join(", ")}</p>
              <p className="text-xs text-gray-400">
                {new Date(post?.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProfile;
