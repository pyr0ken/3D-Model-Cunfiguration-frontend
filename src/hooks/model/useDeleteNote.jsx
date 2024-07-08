import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "../../services/modelsApi";

export default function useDeleteNote() {
  return useMutation({
    mutationFn: (data) => deleteNote(data),
  });
}
