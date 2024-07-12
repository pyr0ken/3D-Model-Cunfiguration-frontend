import { useMutation } from "@tanstack/react-query";
import { enterRoom } from "../../services/roomsApi";

export default function useEnterRoom() {
  return useMutation({
    mutationFn: enterRoom,
  });
}
