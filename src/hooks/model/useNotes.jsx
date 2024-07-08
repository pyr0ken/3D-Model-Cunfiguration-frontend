import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../../services/modelsApi";

export default function useNotes(pointId) {
  return useQuery({
    queryKey: ["notes", pointId],
    queryFn: getNotes,
  });
}
