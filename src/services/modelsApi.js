import { apiAuth } from ".";

// model crud api
export const getModels = async () => {
  return await apiAuth.get("/models/").then((response) => response.data);
};

export const getModel = async (id) => {
  return await apiAuth.get(`/models/${id}`).then((response) => response.data);
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
export const getEditModelDetail = async (modelEditId) => {
  return await apiAuth
    .get(`/models/edit/${modelEditId}/`)
    .then((response) => response.data);
};

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
export const getNotes = async (modelId) => {
  return await apiAuth
    .get(`/models/points/${modelId}`)
    .then((response) => response.data);
};

export const addNote = async (data) => {
  return await apiAuth
    .post("/models/points/add/", data)
    .then((response) => response.data);
};

export const deleteNote = async (data) => {
  return await apiAuth
    .delete("/models/points/delete/", { data: data })
    .then((response) => response.data);
};
