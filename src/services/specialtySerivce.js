import axios from "../axios";

const createSpecialty = (data) => {
  return axios.post(`/api/create-specialty`, data);
};

const getSingleSpecialty = (id) => {
  return axios.get(`/api/get-specialty?id=${id}`);
};

const getAllSpecialty = (data) => {
  return axios.get(
    `/api/get-all-specialty?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}`
  );
};

const deleteSpecialty = (id) => {
  return axios.delete(`/api/delete-specialty?id=${id}`);
};

const getClinicById = (id) => {
  return axios.get(`/api/get-by-clinic?id=${id}`);
};

const updateSpecialty = (id, data) => {
  return axios.put(`/api/update-specialty?id=${id}`, data);
};

const getPopularHomePatient = (filter) => {
  return axios.get(`/api/get-popular-spacialty-home?filter=${filter}`);
};

export {
  getSingleSpecialty,
  getAllSpecialty,
  createSpecialty,
  deleteSpecialty,
  getClinicById,
  updateSpecialty,
  getPopularHomePatient,
};
