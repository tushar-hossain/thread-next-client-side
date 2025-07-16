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
  ;
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
      toast.success("Post deleted successful.");
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteMutation.mutate(id);

        Swal.fire("Delete!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not delete", "", "info");
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>My Post</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
        My Posts
      </h2>
      <p className="text-gray-600 mt-1 mb-6">
        Here you can view and manage all the posts you've shared. View Comments,
        delete, or track the performance of each post.
      </p>
      <table className="table table-zebra w-full bg-base-200">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Votes</th>
            <th>Comment</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {myPosts?.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
              <td>
                <Link to={`/dashboard/commentsPage/${post._id}`}>
                  <button className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm py-2">
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
    </div>
  );
};

export default MyPost;
