import axios from "../axios";

const loginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const changePasswordApiService = (data) => {
  return axios.patch("/api/change-password", data);
};

const resetPasswordApiService = (email) => {
  return axios.patch("/api/reset-password", email);
};

const getAllUserService = (data) => {
  return axios.get(
    `/api/get-all-user?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}`
  );
};

const getSingleUserService = (id) => {
  return axios.get(`/api/get-user?id=${id}`);
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-user`, data);
};

const updateUserService = (id, data) => {
  return axios.put(`/api/update-user?id=${id}`, data);
};

const deleteUserService = (id) => {
  return axios.delete(`/api/delete-user?id=${id}`);
};

const getAllCountDashboard = () => {
  return axios.get(`/api/get-all-count`);
};

const getAllUserHomePatient = (name) => {
  return axios.get(`/api/get-all-user-home?filter=${name}`);
};

const getAllUserBySpecialtyHome = (data) => {
  return axios.get(
    `/api/get-user-by-specialty-home?page=${data.page}&size=${data.size}&id=${data.id}`
  );
};
const getAllDoctorBySpecialtyOfClinicHome = (data) => {
  return axios.get(
    `/api/get-user-by-specialty-clinic-home?page=${data.page}&size=${data.size}&clinicId=${data.clinicId}&specialtyId=${data.specialtyId}`
  );
};

const getAllDoctorByProvince = (data) => {
  return axios.get(
    `/api/get-user-by-province-home?page=${data.page}&size=${data.size}&id=${data.id}&province=${data.province}`
  );
};
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
  changePasswordApiService,
  updateUserService,
  getSingleUserService,
  loginApiService,
  getAllUserService,
  createNewUserService,
  deleteUserService,
  resetPasswordApiService,
  getAllCountDashboard,
  getAllUserHomePatient,
  getAllUserBySpecialtyHome,
  getAllDoctorByProvince,
  getAllLocationClinic,
  getAllManager,
  statisticTimeBooking,
  getAllDoctorBySpecialtyOfClinicHome,
};
