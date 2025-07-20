import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// GET tất cả attachments theo stepId
export const getAttachmentsByStep = (stepId) =>
  API.get("/attachments", { params: { step: stepId } });

// GET attachment theo ID
export const getAttachmentById = (id) => API.get(`/attachments/${id}`);

// Upload file
export const uploadAttachment = (stepId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("step", stepId);
  return API.post("/attachments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Xóa file đính kèm
export const deleteAttachment = (id) => API.delete(`/attachments/${id}`);
