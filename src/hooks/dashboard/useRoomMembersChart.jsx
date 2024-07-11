import { useQuery } from "@tanstack/react-query";
import { getRoomMembersChart } from "../../services/dashboardApi";

export default function useRoomMembersDashboard() {
  return useQuery({
    queryKey: ["dashboardRoomMembers"],
    queryFn: getRoomMembersChart,
  });
}
