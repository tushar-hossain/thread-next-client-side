import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";

const CommentsPage = () => {
  const { id: postId } = useParams();
  const axiosSecure = useAxiosSecure();

  console.log(postId);
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comments?postId=${postId}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-xl font-bold mb-4">All Comments</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Comment</th>
            <th>Feedback</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => {
            return (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.email}</td>
                <td>
                  {comment.text.slice(0, 20)}...
                  <button className="text-blue-500 underline ml-1 cursor-pointer">
                    Read More
                  </button>
                </td>
                <td>
                  <select
                    defaultValue=""
                    className="select select-bordered select-sm"
                  >
                    <option value="">Select feedback</option>
                  </select>
                </td>
                <td>
                  <button className="btn btn-sm btn-error">Report</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsPage;
