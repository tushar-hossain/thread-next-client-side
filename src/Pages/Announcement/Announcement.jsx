import React from "react";
import useAnnouncement from "../../hooks/useAnnouncement";
import { Helmet } from "react-helmet-async";
import { FaBullhorn } from "react-icons/fa";

const Announcement = () => {
  const { announcements, isLoading } = useAnnouncement();

  if (isLoading || announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FaBullhorn className="text-gray-400 text-5xl mb-3" />
        <h2 className="font-poppins text-center font-semibold text-gray-500">
          No announcement found!
        </h2>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <Helmet>
        <title>Announcements</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <FaBullhorn className="text-warning text-2xl" />
        <h2 className="text-2xl md:text-3xl font-bold font-poppins text-slate-800">
          Announcements
        </h2>
      </div>

      {/* Announcement List */}
      <div className="space-y-5">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-200 rounded-xl p-5 flex gap-4"
          >
            {/* Author Avatar */}
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={announcement.authorPhoto}
              alt={announcement.authorName}
            />

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-warning">
                  {announcement.title}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-warning/10 text-warning font-medium">
                  {announcement.role}
                </span>
              </div>

              <p className="text-gray-600 mt-2">{announcement.description}</p>

              <p className="text-sm text-gray-400 mt-3">
                Posted on{" "}
                <span className="font-medium text-gray-500">
                  {new Date(announcement.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
