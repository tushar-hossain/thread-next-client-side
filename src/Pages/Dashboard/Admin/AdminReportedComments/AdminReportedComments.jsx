import React from "react";

const AdminReportedComments = () => {
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
                <th>Reported By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReportedComments;
