import axios from "../axios";

const getAllClinic = (data) => {
  return axios.get(
    `/api/get-all-clinic?page=${data.page}&filter=${data.filter}&size=${data.size}`
  );
};

const getAllClinicHomePatient = () => {
  console.log("🚀 ~ getAllClinicHomePatient ~ getAllClinicHomePatient:");
  return axios.get(`/api/get-all-clinic-home`);
};

export { getAllClinic, getAllClinicHomePatient };
