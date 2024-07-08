import { useQuery } from "@tanstack/react-query";
import { getRoomMembers } from "../../services/roomsApi";

export default function useRoomMembers(roomId) {
  return useQuery({
    queryKey: ["roomMembers"],
    queryFn: () => getRoomMembers(roomId),
  });
}
