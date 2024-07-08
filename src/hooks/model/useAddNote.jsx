import { useMutation } from "@tanstack/react-query";
import { addNote } from "../../services/modelsApi";

export default function useAddNote() {
  return useMutation({
    mutationFn: (data) => addNote(data),
  });
}
