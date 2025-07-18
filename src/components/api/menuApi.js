import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchMenus = () => API.get("/menus");
export const createMenu = (data) => API.post("/menus", data);
export const updateMenu = (id, data) => API.put(`/menus/${id}`, data);
export const deleteMenu = (id) => API.delete(`/menus/${id}`);
