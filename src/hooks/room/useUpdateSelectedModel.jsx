import { useMutation } from "@tanstack/react-query";
import { updateSelectedModel } from "../../services/roomsApi";

export default function useUpdateSelectedModel() {
  return useMutation({
    mutationFn: (data) => updateSelectedModel(data),
  });
}
