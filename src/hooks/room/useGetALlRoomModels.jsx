import { useQuery } from "@tanstack/react-query";
import { getAllRoomModels } from "../../services/roomsApi";

export default function useGetAllRoomModels(meetingId) {
  return useQuery({
    queryKey: ["roomModels", meetingId],
    queryFn: () => getAllRoomModels(meetingId),
    // staleTime: 1000,
  });
}
