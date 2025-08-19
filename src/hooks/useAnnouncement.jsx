
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/announcements`);
      return data;
    },
  });

  return { announcements, isLoading };
};

export default useAnnouncement;
