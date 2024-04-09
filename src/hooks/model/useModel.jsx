import { useQuery } from "@tanstack/react-query";
import { getModel } from "../../services/modelsApi";

export default function useModel(id) {
  return useQuery({
    queryKey: ["model"],
    queryFn: () => getModel(id),
  });
}
