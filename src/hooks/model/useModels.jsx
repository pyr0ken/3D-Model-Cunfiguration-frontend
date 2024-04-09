import { useQuery } from "@tanstack/react-query";
import { getModels } from "../../services/modelsApi";

export default function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });
}
