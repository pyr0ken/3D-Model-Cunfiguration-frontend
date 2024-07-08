import { useMutation } from "@tanstack/react-query";
import { roomMemberLeftReq } from "../../services/roomsApi";

export default function useRoomLeft() {
  return useMutation({
    mutationFn: (data) => roomMemberLeftReq(data),
  });
}
