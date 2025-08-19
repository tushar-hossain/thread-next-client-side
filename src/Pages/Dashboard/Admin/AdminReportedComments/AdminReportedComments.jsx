import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaBan } from "react-icons/fa"; // icons

const AdminReportedComments = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reports");
      return data;
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (commentId) => {
      const { data } = await axiosSecure.delete(`/comments/${commentId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      refetch();
    },
  });

  const dismissReport = useMutation({
    mutationFn: async (reportId) => {
      const { data } = await axiosSecure.delete(`/reports/${reportId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Report dismissed successfully");
      refetch();
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <Helmet>
        <title>Admin Reported Comments</title>
      </Helmet>
      <div>
        <h2 className="text-2xl font-bold mb-4 font-poppins flex items-center gap-2">
          🚨 Reported Comments
        </h2>
        <p className="text-gray-600 mt-1 mb-6">
          Review all comments flagged by users for inappropriate content. Take
          necessary actions to maintain a healthy community environment.
        </p>

        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="table w-full bg-base-200">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Comment ID</th>
                <th>Feedback</th>
                <th>Reported At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report._id} className="hover:bg-base-100">
                  <td>{index + 1}</td>
                  <td className="text-sm font-mono text-gray-700">
                    {report.commentId.commentId}
                  </td>
                  <td className="max-w-xs truncate">
                    {report.commentId.feedback}
                  </td>
                  <td className="text-gray-500">
                    {new Date(report.reportedAt).toDateString()}
                  </td>
                  <td className="flex gap-3 justify-center">
                    <button
                      onClick={() =>
                        deleteComment.mutate(report.commentId.commentId)
                      }
                      className="btn btn-sm btn-error text-white flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                    <button
                      onClick={() => dismissReport.mutate(report._id)}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
                    >
                      <FaBan /> Dismiss
                    </button>
                  </td>
                </tr>
              ))}

              {reports.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    ✅ No reported comments found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReportedComments;
