import { useMutation } from "@tanstack/react-query";
import { joinRoom } from "../../services/roomsApi";

export default function useJoinRoom() {
  return useMutation({
    mutationFn: (data) => joinRoom(data),
  });
}
