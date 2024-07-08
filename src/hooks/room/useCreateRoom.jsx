import { useMutation } from "@tanstack/react-query";
import { createRoom } from "../../services/roomsApi";

export default function useCreateRoom() {
  return useMutation({
    mutationFn: createRoom,
  });
}
