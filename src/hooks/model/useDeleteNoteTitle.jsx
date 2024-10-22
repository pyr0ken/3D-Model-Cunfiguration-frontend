import { useMutation } from "@tanstack/react-query";
import { deleteNoteTitle } from "../../services/modelsApi";

export default function useDeleteNoteTitle() {
  return useMutation({
    mutationFn: (data) => deleteNoteTitle(data),
  });
}
