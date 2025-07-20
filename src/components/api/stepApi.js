import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// GET tất cả bước theo infoBoardId
export const getStepsByInfoBoard = (infoBoardId) =>
  API.get("/steps", { params: { infoBoard: infoBoardId } });

// GET theo ID
export const getStepById = (id) => API.get(`/steps/${id}`);

// Tạo mới
export const createStep = (data) => API.post("/steps", data);

// Cập nhật
export const updateStep = (id, data) => API.put(`/steps/${id}`, data);

// Xóa
export const deleteStep = (id) => API.delete(`/steps/${id}`);
