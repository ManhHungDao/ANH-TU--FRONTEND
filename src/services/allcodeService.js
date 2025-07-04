import axios from "../axios";

const getAllcode = () => {
  return axios.get(`/api/get-all-allcode`);
};

const getAllCodeByType = (data) => {
  return axios.get(
    `/api/get-allcode-pagination?page=${data.page}&filter=${data.filter}&size=${data.size}`
  );
};

const createAllcode = (data) => {
  return axios.post(`/api/create-allcode`, data);
};
const updateAllcode = (id, data) => {
  return axios.put(`/api/update-allcode?id=${id}`, data);
};
const deleteAllcode = (id) => {
  return axios.delete(`/api/delete-allcode?id=${id}`);
};

export {
  getAllcode,
  createAllcode,
  updateAllcode,
  deleteAllcode,
  getAllCodeByType,
};
