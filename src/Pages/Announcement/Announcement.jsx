import React from "react";
import useAnnouncement from "../../hooks/useAnnouncement";

const Announcement = () => {
    const { announcements, isLoading } = useAnnouncement();
    
  return <div>Announcement</div>;
};

export default Announcement;
