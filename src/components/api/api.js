import axios from "axios";

const API_URL_MENU = "http://localhost:5000/api/menus";
const API_URL_STEP = "http://localhost:5000/api/steps";

// Lấy toàn bộ menu (kèm steps nếu backend trả về)
export const getMenus = async (parent = null) => {
  try {
    // Tạo URL phù hợp với backend
    const queryParam = parent === null ? "null" : parent;
    const response = await fetch(`${API_URL_MENU}?parent=${queryParam}`);

    if (!response.ok) {
      throw new Error("Không thể tải danh sách menu");
    }

    const menus = await response.json();
    return menus;
  } catch (error) {
    console.error("Lỗi khi gọi getMenus:", error);
    throw error;
  }
};
// lấy toàn bộ cây con của menu
export const getMenuTreeById = async (menuId) => {
  try {
    const res = await axios.get(`${API_URL_MENU}/full-tree/${menuId}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi gọi getMenuTreeById:", err);
    throw err;
  }
};

// Lấy menu theo ID
export const getMenuById = async (id) => {
  const res = await axios.get(`${API_URL_MENU}/${id}`);
  return res.data;
};

// Tạo mới menu
export const createMenu = async (menu) => {
  const res = await axios.post(API_URL_MENU, menu);
  return res.data;
};

// Cập nhật menu
export const updateMenu = async (id, menu) => {
  const res = await axios.put(`${API_URL_MENU}/${id}`, menu);
  return res.data;
};

// Xoá menu
export const deleteMenu = async (id) => {
  const res = await axios.delete(`${API_URL_MENU}/${id}`);
  return res.data;
};

// Lấy tất cả steps hoặc theo menu ID
export const getSteps = async (menuId = null) => {
  const res = await axios.get(API_URL_STEP, {
    params: menuId ? { menu: menuId } : {},
  });
  return res.data;
};

// Lấy step theo ID
export const getStepById = async (id) => {
  const res = await axios.get(`${API_URL_STEP}/${id}`);
  return res.data;
};

// Tạo mới step (kèm file)
export const createStep = async (stepData, files = []) => {
  const formData = new FormData();
  formData.append("menu", stepData.menu);
  formData.append("title", stepData.title);
  formData.append("content", stepData.content || "");
  formData.append("order", stepData.order || 0);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await axios.post(API_URL_STEP, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Cập nhật step (có thể thay file)
export const updateStep = async (id, stepData, files = []) => {
  const formData = new FormData();
  formData.append("title", stepData.title);
  formData.append("content", stepData.content || "");
  formData.append("order", stepData.order || 0);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await axios.put(`${API_URL_STEP}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Xoá step
export const deleteStep = async (id) => {
  const res = await axios.delete(`${API_URL_STEP}/${id}`);
  return res.data;
};

export const api = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  getSteps,
  getStepById,
  createStep,
  updateStep,
  deleteStep,
  getMenuTreeById,
};
