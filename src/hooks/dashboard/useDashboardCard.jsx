import { useQuery } from "@tanstack/react-query";
import { getDashboardCard } from "../../services/dashboardApi";

export default function useDashboardCard() {
  return useQuery({
    queryKey: ["dashboardCard"],
    queryFn: getDashboardCard,
  });
}
