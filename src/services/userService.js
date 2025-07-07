import axios from "../axios";

// dashboard
const getAllPatientAccount = () => {
  return axios.get(`/api/get-all-patient-account`);
};
const getAllDoctorAccount = () => {
  return axios.get(`/api/get-all-doctor-account`);
};
const getAllMedicalHistory = () => {
  return axios.get(`/api/get-all-medical-history`);
};
const getAllLocationClinic = () => {
  return axios.get(`/api/get-all-locaiton-clinic`);
};

const statisticTimeBooking = () => {
  return axios.get(`/api/get-statistic-time`);
};

const getAllManager = () => {
  return axios.get(`/api/get-all-manager`);
};

const upsertRoleUser = (data) => {
  return axios.put(`/api/upsert-role-user`, data);
};

const getRoleUser = (id) => {
  return axios.get(`/api/get-role-user?id=${id}`);
};

export {
  upsertRoleUser,
  getRoleUser,
  getAllPatientAccount,
  getAllDoctorAccount,
  getAllMedicalHistory,
  getAllLocationClinic,
  getAllManager,
  statisticTimeBooking,
};
