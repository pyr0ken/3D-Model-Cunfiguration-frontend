import { useMutation } from "@tanstack/react-query";
import { roomEndReq } from "../../services/roomsApi";

export default function useRoomEnd() {
  return useMutation({
    mutationFn: (data) => roomEndReq(data),
  });
}
