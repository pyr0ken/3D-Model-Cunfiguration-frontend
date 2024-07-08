import { useMutation } from "@tanstack/react-query";
import { deleteRoom } from "../../services/roomsApi";

export default function useDeleteRoom() {
  return useMutation({
    mutationFn: (data) => deleteRoom(data),
  });
}
