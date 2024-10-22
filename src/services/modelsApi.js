import { apiAuth, apiBase } from ".";

// model crud api
export const getModels = async () => {
  return await apiAuth.get("/models/").then((response) => response.data);
};

export const deleteModel = async (data) => {
  return await apiAuth
    .delete("/models/delete/", { data: data })
    .then((response) => response.data);
};

// model upload api
export const getUploadedModel = async () => {
  return await apiAuth.get("/models/upload/").then((response) => response.data);
};
export const uploadModel = async (variables) => {
  const { file, title, setUploadProgress } = variables;
  return await apiAuth
    .post(
      `/models/upload/`,
      { file, title },
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(percent);
        },
      },
    )
    .then((response) => response.data);
};

// edit model api
export const getEditedModel = async () => {
  return await apiAuth.get("/models/edit/").then((response) => response.data);
};

export const addEditModel = async (data) => {
  return await apiAuth
    .post("/models/edit/", data)
    .then((response) => response.data);
};

export const deleteEditModel = async (data) => {
  return await apiAuth
    .delete("/models/edit/delete/", { data: data })
    .then((response) => response.data);
};

// points api
export const getPoints = async (modelId) => {
  return await apiAuth
    .get(`/models/points/${modelId}/`)
    .then((response) => response.data);
};

export const addPoint = async (data) => {
  return await apiAuth
    .post("/models/points/add/", data)
    .then((response) => response.data);
};

export const deletePoint = async (data) => {
  return await apiAuth
    .delete("/models/points/delete/", { data: data })
    .then((response) => response.data);
};

// note api
export const addNote = async (data) => {
  return await apiAuth
    .post("/models/notes/add/", data)
    .then((response) => response.data);
};

export const deleteNote = async (data) => {
  return await apiAuth
    .delete("/models/notes/delete/", { data: data })
    .then((response) => response.data);
};

export const deleteNoteTitle = async (data) => {
  return await apiAuth
    .delete("/models/notes/title/delete/", { data: data })
    .then((response) => response.data);
};

// ai api
export const aiNoteDetail = async (data) => {
  return await apiAuth
    .post("/models/ai/note/", data)
    .then((response) => response.data);
};

export const imageTo3dModel = async (variables) => {
  const { file, title } = variables;
  return await apiAuth
    .post(
      `/models/ai/image-to-3d/`,
      { file, title },
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    )
    .then((response) => response.data);
};


export const getPointCloud = async (data) => {
  return await apiBase
    .post("/models/ai/segmentation/point-cloud/", data)
    .then((response) => response.data);
};

export const clearPC = async () => {
  return await apiBase
    .post("/models/ai/segmentation/clear/")
    .then((response) => response.data);
};

export const segmentPC = async (data) => {
  return await apiBase
    .post("/models/ai/segmentation/segment/", data)
    .then((response) => response.data);
};
