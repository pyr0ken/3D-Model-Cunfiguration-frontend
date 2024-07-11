import { apiAuth } from ".";

export const getDashboardCard = async () => {
  return await apiAuth.get("/dashboard/").then((response) => response.data);
};


export const getRoomMembersChart = async () => {
  return await apiAuth.get("/dashboard/room-members/").then((response) => response.data);
};


export const getEditModelsChart = async () => {
    return await apiAuth.get("/dashboard/edit-models/").then((response) => response.data);
  };
  
