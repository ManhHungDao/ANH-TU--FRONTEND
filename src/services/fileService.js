import axios from "../axios";

const getAllFile = (data) => {
  return axios.get(
    `/api/files?page=${data.page}&filter=${data.filter}&size=${data.size}`
  );
};

export { getAllFile };
