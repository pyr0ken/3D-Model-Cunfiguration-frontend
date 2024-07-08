import { useMutation } from "@tanstack/react-query";
import { addRoomModel } from "../../services/roomsApi";

export default function useAddRoomModel() {
  return useMutation({
    mutationFn: addRoomModel,
  });
}
