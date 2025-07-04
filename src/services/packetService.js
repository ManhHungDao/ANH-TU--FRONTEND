import axios from "../axios";

const createPacketService = (data) => {
  return axios.post(`/api/create-packet`, data);
};
const deletePacket = (id) => {
  return axios.delete(`/api/delete-packet?id=${id}`);
};
const getSinglePacket = (id) => {
  return axios.get(`/api/get-packet?id=${id}`);
};
const updatePacket = (id,data) => {
  return axios.put(`/api/update-packet?id=${id}`,data);
};
const getAllPacket = (data) => {
  return axios.get(
    `/api/get-all-packet?page=${data.page}&clinicId=${data.clinicId}&filter=${data.filter}&size=${data.size}&type=${data.type}`
  );
};

export { createPacketService, deletePacket, getSinglePacket, getAllPacket ,updatePacket};
