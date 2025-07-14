import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";

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

  if (isLoading) return <Loading />;

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4 font-poppins">
          Reported Comments
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
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
                      className="btn btn-sm btn-error"
                    >
                      Delete Comment
                    </button>
                    <button
                      onClick={() => {}}
                      className="btn btn-sm btn-outline"
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
