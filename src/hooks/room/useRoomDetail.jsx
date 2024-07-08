import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "../../services/roomsApi";

export default function useRoomDetail(roomId) {
  return useQuery({
    queryKey: ["rooms", roomId],
    queryFn: () => getRoomDetail(roomId),
  });
}
