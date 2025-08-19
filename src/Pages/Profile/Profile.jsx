import React from "react";
import { Helmet } from "react-helmet-async";
import { FaUserAlt, FaPen, FaComments } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-24 h-24 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <FaPen className="text-blue-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Posts</p>
            {/* <p className="font-semibold text-lg">{stats?.posts || 0}</p> */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <FaComments className="text-purple-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Comments</p>
            {/* <p className="font-semibold text-lg">{stats?.comments || 0}</p> */}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center gap-3">
          <FaUserAlt className="text-green-500 text-2xl" />
          <div>
            <p className="text-gray-500 text-sm">Users</p>
            {/* <p className="font-semibold text-lg">{stats?.users || 0}</p> */}
          </div>
        </div>
      </div>

      {/* Bio or Description */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">About Me</h3>
        <p className="text-gray-600">
          {user?.bio ||
            "This user has not added a bio yet. Share something interesting about yourself!"}
        </p>
      </div>

      {/* Optional Actions */}
      {/* <div className="flex gap-4">
        <button className="btn btn-outline btn-primary w-full">
          Edit Profile
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
