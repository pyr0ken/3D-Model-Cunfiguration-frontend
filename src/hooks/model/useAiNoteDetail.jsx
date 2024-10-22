import { useMutation } from "@tanstack/react-query";
import { aiNoteDetail } from "../../services/modelsApi";

export default function useAiNoteDetail() {
  return useMutation({
    mutationFn: (data) => aiNoteDetail(data),
  });
}
