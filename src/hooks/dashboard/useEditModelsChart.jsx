import { useQuery } from "@tanstack/react-query";
import { getEditModelsChart } from "../../services/dashboardApi";

export default function useEditModelsDashboard() {
  return useQuery({
    queryKey: ["dashboardEditModels"],
    queryFn: getEditModelsChart,
  });
}
