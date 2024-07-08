import { useQuery } from "@tanstack/react-query";
import { getAllRooms } from "../../services/roomsApi";

export default function useRooms() {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: getAllRooms,
    staleTime: 1000,
    gcTime: 1000,
  });
}
