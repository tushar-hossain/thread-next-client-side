import React from "react";

const ManageUsers = () => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold font-poppins mb-4">Manage Users</h2>

        <div className="text-center">
          <input
            type="text"
            value={""}
            onChange={() => {}}
            placeholder="Search by users name"
            className="input input-bordered mb-4 w-full max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
