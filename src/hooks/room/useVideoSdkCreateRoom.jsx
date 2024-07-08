import { useMutation } from "@tanstack/react-query";
import { createVideoSdkRoom } from "../../services/roomsApi";

export default function useVideoSdkCreateRoom() {
  return useMutation({
    mutationFn: createVideoSdkRoom,
  });
}
