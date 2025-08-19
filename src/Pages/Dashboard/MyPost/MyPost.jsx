import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { Link } from "react-router";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const MyPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myPosts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPosts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-posts?email=${user.email}`);
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      const res = await axiosSecure.delete(`/posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post deleted successfully.");
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Post is safe", "", "info");
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full overflow-x-auto px-4 my-10">
      <Helmet>
        <title>My Posts</title>
      </Helmet>

      {/* Page Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
        My Posts
      </h2>
      <p className="text-gray-600 mb-6">
        View and manage all your posts. You can check comments, delete posts,
        and track the performance of each post.
      </p>

      {/* Table */}
      <table className="table table-zebra w-full bg-base-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-sky-500 text-white">
            <th>#</th>
            <th>Title</th>
            <th>Votes</th>
            <th>Comments</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myPosts?.map((post, index) => (
            <tr key={post._id} className="hover:bg-slate-100">
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
              <td>
                <Link to={`/dashboard/commentsPage/${post._id}`}>
                  <button className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm py-1 px-2">
                    View Comments
                  </button>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-sm btn-error text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty state */}
      {myPosts?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          You have not created any posts yet.
        </p>
      )}
    </div>
  );
};

export default MyPost;
