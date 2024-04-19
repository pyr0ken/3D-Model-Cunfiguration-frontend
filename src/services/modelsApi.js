import { apiBase } from ".";

export const getModels = async () => {
  return await apiBase.get("/models/").then(responce => responce.data)
};

export const getModel = async (id) => {
  return await apiBase.get(`/models/${id}`).then(responce => responce.data)
};
