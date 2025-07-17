import axios from "axios";

const API_URL = "http://localhost:5000/api/menus"; // Thay đổi URL nếu cần

// Service xử lý lỗi
const handleError = (error) => {
  console.error("API Error:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};

// Cấu hình Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======== MENU (LEVEL 1) ========
export const fetchAllMenus = async () => {
  try {
    const response = await api.get("/");
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const createMenu = async (name) => {
  try {
    const response = await api.post("/", { name });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateMenu = async (menuId, name) => {
  try {
    const response = await api.put(`/${menuId}`, { name });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteMenu = async (menuId) => {
  try {
    const response = await api.delete(`/${menuId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// ======== LEVEL 2 ========
export const addLevel2 = async (menuId, name) => {
  try {
    const response = await api.post(`/${menuId}/level2`, { name });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateLevel2 = async (menuId, level2Id, name) => {
  try {
    const response = await api.put(`/${menuId}/level2/${level2Id}`, { name });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteLevel2 = async (menuId, level2Id) => {
  try {
    const response = await api.delete(`/${menuId}/level2/${level2Id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// ======== LEVEL 3 ========
export const addLevel3 = async (menuId, level2Id, name) => {
  try {
    const response = await api.post(`/${menuId}/level2/${level2Id}/level3`, {
      name,
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateLevel3 = async (menuId, level2Id, level3Id, name) => {
  try {
    const response = await api.put(
      `/${menuId}/level2/${level2Id}/level3/${level3Id}`,
      { name }
    );
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteLevel3 = async (menuId, level2Id, level3Id) => {
  try {
    const response = await api.delete(
      `/${menuId}/level2/${level2Id}/level3/${level3Id}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// ======== STEPS ========
export const addStep = async (location, stepData) => {
  try {
    let url = "";

    if (location.menuId && location.level2Id && location.level3Id) {
      url = `/${location.menuId}/level2/${location.level2Id}/level3/${location.level3Id}/steps`;
    } else if (location.menuId && location.level2Id) {
      url = `/${location.menuId}/level2/${location.level2Id}/steps`;
    } else if (location.menuId) {
      url = `/${location.menuId}/steps`;
    } else {
      throw new Error("Missing location.menuId for step");
    }

    const response = await api.post(url, stepData);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateStep = async (stepId, stepData) => {
  try {
    if (!stepData.title) {
      console.warn(
        "Warning: Missing title in updateStep. This may cause API error."
      );
    }
    const response = await api.put(`/steps/${stepId}`, stepData);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteStep = async (stepId) => {
  try {
    const response = await api.delete(`/steps/${stepId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const reorderSteps = (location, stepIds) => {
  return axios.post(`/api/menus/${location}/steps/reorder`, { stepIds });
};

// ======== FILE UPLOAD ========
export const uploadFiles = async (stepId, files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await api.post(`/steps/${stepId}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteFile = async (stepId, fileId) => {
  try {
    const response = await api.delete(`/steps/${stepId}/files/${fileId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default {
  fetchAllMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  addLevel2,
  updateLevel2,
  deleteLevel2,
  addLevel3,
  updateLevel3,
  deleteLevel3,
  addStep,
  updateStep,
  deleteStep,
  uploadFiles,
  deleteFile,
};
