import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import {
  FaMedal,
  FaTags,
  FaEye,
  FaThumbsUp,
  FaThumbsDown,
  FaEnvelope,
  FaFileAlt,
  FaClock,
  FaEdit,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router";

const MyProfile = () => {
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

  const getBadgeConfig = (badge) => {
    switch (badge) {
      case "gold":
        return {
          color: "from-yellow-400 to-yellow-600",
          bgColor: "bg-yellow-500",
          textColor: "text-yellow-800",
          name: "Gold Member",
          description: "Top contributor with excellent engagement",
        };
      case "silver":
        return {
          color: "from-gray-300 to-gray-500",
          bgColor: "bg-gray-400",
          textColor: "text-gray-800",
          name: "Silver Member",
          description: "Active community member",
        };
      case "bronze":
        return {
          color: "from-amber-600 to-amber-800",
          bgColor: "bg-amber-600",
          textColor: "text-amber-800",
          name: "Bronze Member",
          description: "Growing community contributor",
        };
      default:
        return {
          color: "from-slate-400 to-slate-600",
          bgColor: "bg-slate-500",
          textColor: "text-slate-800",
          name: "New Member",
          description: "Welcome to the community!",
        };
    }
  };

  const badgeConfig = getBadgeConfig(profile?.badge);

  // Calculate user stats
  const totalPosts = recentPosts?.length || 0;
  const totalVotes =
    recentPosts?.reduce(
      (acc, post) => acc + (post.upVote || 0) + (post.downVote || 0),
      0
    ) || 0;
  const totalUpvotes =
    recentPosts?.reduce((acc, post) => acc + (post.upVote || 0), 0) || 0;

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Profile - ThredNest</title>
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 relative z-10">
              <div className="relative">
                <img
                  src={profile?.image}
                  alt={profile?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      profile?.name || "User"
                    )}&background=0ea5e9&color=ffffff&size=200`;
                  }}
                />

                {/* Badge Overlay */}
                {profile?.badge && (
                  <div
                    className={`absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-r ${badgeConfig.color} shadow-lg`}
                  >
                    <FaMedal className="text-white text-lg" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                      {profile?.name}
                    </h1>
                    <p className="text-slate-600 flex items-center gap-2 mb-3">
                      <FaEnvelope size={14} />
                      {profile?.email}
                    </p>

                    {/* Badge Info */}
                    {profile?.badge && (
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badgeConfig.color} text-white font-medium shadow-md`}
                      >
                        <FaTrophy size={16} />
                        <span>{badgeConfig.name}</span>
                      </div>
                    )}
                  </div>

                  {/* <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 w-fit">
                    <FaEdit size={16} />
                    Edit Profile
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Total Posts
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {totalPosts}
                </p>
              </div>
              <div className="p-3 bg-sky-100 rounded-full">
                <FaFileAlt className="text-sky-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Total Upvotes
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {totalUpvotes}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <FaThumbsUp className="text-emerald-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  Engagement
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {totalVotes}
                </p>
              </div>
              <div className="p-3 bg-fuchsia-100 rounded-full">
                <FaChartLine className="text-fuchsia-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Badge Information */}
        {profile?.badge && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FaTrophy className="text-sky-500" />
              Achievement Status
            </h3>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <div
                className={`p-4 rounded-full bg-gradient-to-r ${badgeConfig.color}`}
              >
                <FaMedal className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-lg">
                  {badgeConfig.name}
                </h4>
                <p className="text-slate-600">{badgeConfig.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FaFileAlt className="text-sky-500" />
              My Recent Posts
            </h3>
            <Link
              to="/dashboard/add-post"
              className="text-sky-600 hover:text-sky-700 text-sm font-medium flex items-center gap-1 transition-colors duration-200"
            >
              <FaEdit size={14} />
              Create New Post
            </Link>
          </div>

          {recentPosts?.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 hover:border-sky-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-800 text-lg mb-2 line-clamp-2">
                        {post.title}
                      </h4>

                      <p className="text-slate-600 mb-3 line-clamp-2">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full font-medium"
                            >
                              <FaTags size={10} />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-slate-500 text-sm px-2 py-1">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <FaClock size={12} />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>

                        <span className="flex items-center gap-1 text-emerald-600">
                          <FaThumbsUp size={12} />
                          {post.upVote || 0}
                        </span>

                        <span className="flex items-center gap-1 text-red-500">
                          <FaThumbsDown size={12} />
                          {post.downVote || 0}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2">
                      <Link
                        to={`/postDetails/${post._id}`}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 w-fit"
                      >
                        <FaEye size={14} />
                        View
                      </Link>

                      <Link to={`/edit-post/${post._id}`}>
                        <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 w-fit">
                          <FaEdit size={14} />
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFileAlt className="text-slate-400 text-2xl" />
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-2">
                No Posts Yet
              </h4>
              <p className="text-slate-600 mb-6">
                You haven't created any posts yet. Start sharing your thoughts
                with the community!
              </p>
              <Link
                to="/create-post"
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2"
              >
                <FaEdit />
                Create Your First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
