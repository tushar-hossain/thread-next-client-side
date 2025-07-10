import React from "react";
import useAnnouncement from "../../hooks/useAnnouncement";

const Announcement = () => {
  const { announcements, isLoading } = useAnnouncement();

  if (isLoading || announcements.length === 0) {
    return (
      <h2 className="font-poppins text-center font-semibold">
        No announcement found!
      </h2>
    );
  }

  return (
    <div className="my-10">
      <h2 className="text-xl md:text-2xl font-semibold font-poppins mb-5">
        Announcements
      </h2>
      <ul className="space-y-3">
        {announcements.map((announcement) => (
          <li
            key={announcement._id}
            className="bg-white p-4 border-l-4 border-warning shadow-sm hover:shadow-md rounded"
          >
            <h3 className="font-bold text-warning">{announcement.title}</h3>
            <p className="text-gray-600 mt-1">{announcement.description}</p>
            <p className="text-sm text-gray-400 mt-1">
              By{announcement.authorName} -{" "}
              {new Date(announcement.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
