import { apiAuth } from ".";

// room crud api
export const getAllRooms = async () => {
  return await apiAuth.get("/rooms/").then((response) => response.data);
};

export const createRoom = async (data) => {
  return await apiAuth.post("/rooms/", data).then((response) => response.data);
};

export const deleteRoom = async (data) => {
  return await apiAuth
    .delete("/rooms/", { data: data })
    .then((response) => response.data);
};

export const getRoomDetail = async (roomId) => {
  return await apiAuth
    .get(`/rooms/${roomId}/detail/`)
    .then((response) => response.data);
};

// room video sdk api
export const enterRoom = async (data) => {
  return await apiAuth.post("/rooms/enter/", data);
};
export const joinRoom = async (data) => {
  return await apiAuth
    .post(`/rooms/join/`, data)
    .then((response) => response.data);
};

export const roomEndReq = async (data) => {
  return await apiAuth.post("/rooms/end/", data);
};

export const roomMemberLeftReq = async (data) => {
  return await apiAuth.post("/rooms/left/", data);
};

// room model api
export const getAllRoomModels = async (meetingId) => {
  return await apiAuth.get(`/rooms/models/${meetingId}/`);
};

export const addRoomModel = async (data) => {
  return await apiAuth.post("/rooms/models/", data);
};

export const updateSelectedModel = async (data) => {
  return await apiAuth.post("/rooms/models/select/", data);
};

export const deleteRoomModel = async (data) => {
  return await apiAuth.post("/rooms/models/delete/", data);
};
