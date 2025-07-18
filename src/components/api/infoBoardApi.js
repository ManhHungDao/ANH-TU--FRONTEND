import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// GET tất cả InfoBoards
export const getAllInfoBoards = () => API.get("/infoboards");

// GET theo ID
export const getInfoBoardById = (id) => API.get(`/infoboards/${id}`);

// GET theo menuId (giả định bạn đã thêm filter `?menu=` ở backend)
export const getInfoBoardByMenu = (menuId) =>
  API.get("/infoboards", { params: { menu: menuId } });

// Tạo mới
export const createInfoBoard = (data) => API.post("/infoboards", data);

// Cập nhật
export const updateInfoBoard = (id, data) => API.put(`/infoboards/${id}`, data);

// Xóa
export const deleteInfoBoard = (id) => API.delete(`/infoboards/${id}`);
