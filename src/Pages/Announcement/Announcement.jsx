import React from "react";
import useAnnouncement from "../../hooks/useAnnouncement";
import { Helmet } from "react-helmet-async";

const Announcement = () => {
  const { announcements, isLoading } = useAnnouncement();

  if (isLoading || announcements.length === 0) {
    return (
      <h2 className="font-poppins text-center font-semibold my-10">
        No announcement found!
      </h2>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Announcements</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-semibold font-poppins mb-5">
        Announcements
      </h2>
      <ul className="space-y-3">
        {announcements.map((announcement) => (
          <div>
            <div>
              <li
                key={announcement._id}
                className="bg-white p-4 border-l-4 border-warning shadow-sm hover:shadow-md rounded flex  items-center gap-4"
              >
                <div>
                  <img
                    className="w-10 h-10 rounded-full mr-3"
                    src={announcement.authorPhoto}
                    alt={announcement.authorPhoto}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-warning">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {announcement.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    By {announcement.role} -{" "}
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
