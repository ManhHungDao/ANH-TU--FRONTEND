import axios from "../axios";

const upsertSchedule = (data) => {
  return axios.post(`/api/upsert-schedule`, data);
};

const updateStatus = (data) => {
  return axios.put(`/api/update-status-schedule`, data);
};

const sentMailPatient = (data) => {
  return axios.post(`/api/sent-mail-patient`, data);
};

const getSingleUserSchedule = (id, date) => {
  return axios.get(`/api/get-single-user-schedule?id=${id}&date=${date}`);
};

const getSinglePacketSchedule = (id, date) => {
  return axios.get(`/api/get-single-packet-schedule?id=${id}&date=${date}`);
};

const getScheduleUserByDate = (data) => {
  return axios.get(
    `/api/get-user-schedule?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}&date=${data.date}`
  );
};

const getSchedulePacketByDate = (data) => {
  return axios.get(
    `/api/get-packet-schedule?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}&date=${data.date}`
  );
};

const deleteSchedule = (data) => {
  return axios.delete(
    `/api/delete-schedule?doctorId=${data.doctorId}&packetId=${data.packetId}&date=${data.date}`
  );
};

const createUserBookingSchedule = (data) => {
  return axios.put(`/api/create-user-booking-schedule`, data);
};

const patientConfirmBooking = (data) => {
  return axios.put(`/api/patient-confirm-booking`, data);
};

const patientUpdateFeedback = (data) => {
  return axios.put(`/api/patient-feedback`, data);
};

const patientCheckAllowUpdateFeedback = (data) => {
  return axios.get(`/api/check-patient-feedback`, {
    params: {
      date: data.date,
      time: data.time,
      doctorId: data.doctorId,
      packetId: data.packetId,
    },
  });
};

const getDetailSchedule = (id, time) => {
  return axios.get(`/api/get-detail-schedule?id=${id}&time=${time}`);
};

const getAllPatientByDoctor = (id) => {
  return axios.get(`/api/get-patient-comment-by-doctor?id=${id}`);
};
const getAllPatientByPacket = (id) => {
  return axios.get(`/api/get-patient-comment-by-packet?id=${id}`);
};

export {
  upsertSchedule,
  getSingleUserSchedule,
  deleteSchedule,
  sentMailPatient,
  getScheduleUserByDate,
  updateStatus,
  getSchedulePacketByDate,
  getSinglePacketSchedule,
  createUserBookingSchedule,
  patientConfirmBooking,
  patientUpdateFeedback,
  patientCheckAllowUpdateFeedback,
  getDetailSchedule,
  getAllPatientByDoctor,
  getAllPatientByPacket,
};
