import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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
        <h2 className="text-xl font-semibold mb-4 font-poppins">
          Reported Comments
        </h2>
        <p className="text-gray-600 mt-1 mb-6">
          Review all comments flagged by users for inappropriate content. Take
          necessary actions to maintain a healthy community environment.
        </p>

        <div className="overflow-x-auto">
          <table className="table w-full bg-base-200">
            <thead>
              <tr>
                <th>#</th>
                <th>Comment ID</th>
                <th>Feedback</th>
                <th>Reported At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report._id}>
                  <td>{index + 1}</td>
                  <td>{report.commentId.commentId}</td>
                  <td>{report.commentId.feedback}</td>
                  <td>{new Date(report.reportedAt).toDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() =>
                        deleteComment.mutate(report.commentId.commentId)
                      }
                      className="btn btn-sm btn-error text-white"
                    >
                      Delete Comment
                    </button>
                    <button
                      onClick={() => dismissReport.mutate(report._id)}
                      className="btn bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 text-sm btn-sm"
                    >
                      Dismiss Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReportedComments;
