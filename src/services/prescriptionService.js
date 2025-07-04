import axios from "../axios";

const createPrescription = (data) => {
  return axios.post(`/api/create-prescription`, data);
};

const getSinglePrescription = (id) => {
  return axios.get(`/api/get-single-prescription?id=${id}`);
};

const getRecentMedicalHistory = (email) => {
  return axios.get(`/api/get-list-result-recent?email=${email}`);
};

export { createPrescription, getSinglePrescription, getRecentMedicalHistory };
