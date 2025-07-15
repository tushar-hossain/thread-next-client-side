import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import toast from "react-hot-toast";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Helmet } from "react-helmet-async";

const CommentsPage = () => {
    <Helmet>
      <title>Comments Page</title>
    </Helmet>;
  const { id: postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reportedComments, setReportedComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const feedbackOptions = [
    "Contains abusive language",
    "Irrelevant to post topic",
    "Looks like spam",
  ];

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/comments/${postId}`);
      return data;
    },
  });

  const reportMutation = useMutation({
    mutationFn: async (commentId, feedback) => {
      const { data } = await axiosSecure.post("/reports", {
        commentId,
        feedback,
        reportedAt: new Date().toISOString(),
      });
      return data;
    },
    onSuccess: (_, { commentId }) => {
      toast.success("Reported successfully");
      setReportedComments((prev) => [...prev, commentId]);
    },
  });

  const handelFeedbackChange = (commentId, value) => {
    setSelectedFeedback((prev) => ({ ...prev, [commentId]: value }));
  };

  const handelReadMore = (text) => {
    setModalText(text);
    setOpenModal(true);
  };

  const handelReport = (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;
    reportMutation.mutate({ commentId, feedback });
  };

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
            const isLong = comment.text.length > 20;
            const isReported = reportedComments.includes(comment._id);
            const feedbackSelected = selectedFeedback[comment._id];

            return (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.email}</td>
                <td>
                  {isLong ? (
                    <>
                      {comment.text.slice(0, 20) + "..."}
                      <button
                        onClick={() => handelReadMore(comment.text)}
                        className="text-blue-500 underline ml-1 cursor-pointer"
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    comment.text
                  )}
                </td>
                <td>
                  <select
                    defaultValue=""
                    onChange={(e) =>
                      handelFeedbackChange(comment._id, e.target.value)
                    }
                    disabled={isReported}
                    className="select select-bordered select-sm"
                  >
                    <option disabled value="">
                      Select feedback
                    </option>
                    {feedbackOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    disabled={!feedbackSelected || isReported}
                    onClick={() => handelReport(comment._id)}
                  >
                    {isReported ? "Reported" : "Report"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <Modal open={openModal} onClose={() => setOpenModal(false)} center>
          <h2 className="text-lg font-semibold mb-2">Full Comment</h2>
          <p>{modalText}</p>
        </Modal>
      </table>
    </div>
  );
};

export default CommentsPage;
