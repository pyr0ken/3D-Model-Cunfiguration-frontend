import { useMutation } from "@tanstack/react-query";
import { deleteRoomModel } from "../../services/roomsApi";

export default function useDeleteRoomModel() {
  return useMutation({
    mutationFn: (data) => deleteRoomModel(data),
  });
}
