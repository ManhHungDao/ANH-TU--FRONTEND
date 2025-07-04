import axios from "../axios";

const createHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};

const getAllHandbook = (data) => {
  return axios.get(
    `/api/get-all-handbook?page=${data.page}&specialtyId=${data.specialtyId}&filter=${data.filter}&size=${data.size}`
  );
};

const deleteHandbook = (id) => {
  return axios.delete(`/api/delete-handbook?id=${id}`);
};

const updateHandbook = (id, data) => {
  return axios.put(`/api/update-handbook?id=${id}`, data);
};

const getAllHandbookHomePatient = (data) => {
  return axios.get(`/api/get-all-home-handbook?page=${data.page}&specialtyId=${data.specialtyId}&filter=${data.filter}&size=${data.size}`);
};

const getSingleHandbook = (id) => {
  return axios.get(`/api/get-single-handbook?id=${id}`);
};

const getAllSpecialtyInHandbook = () => {
  return axios.get(`/api/get-all-specialty-handbook`);
};

const getRelatedHandbook = (data) => {
  return axios.get(
    `/api/get-related-handbook?page=${data.page}&specialtyId=${data.specialtyId}&size=${data.size}`
  );
};

export {
  createHandbook,
  getAllHandbook,
  deleteHandbook,
  updateHandbook,
  getAllHandbookHomePatient,
  getSingleHandbook,
  getAllSpecialtyInHandbook,
  getRelatedHandbook,
};
