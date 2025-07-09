/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";

import { getAllFile } from "../../services/fileService";

import { toast } from "react-toastify";
import { Pagination } from "reactstrap";

export const loadingToggleAction = (status) => {
  return {
    type: actionTypes.LOADING_TOGGLE_ACTION,
    data: status,
  };
};

// export const getListClinicAction = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       dispatch(loadingToggleAction(true));
//       const res = await getAllClinic(data);
//       if (res && res.success) {
//         dispatch({
//           type: actionTypes.GET_LIST_CLINIC_SUCCEED,
//           data: {
//             list: res.clinics,
//             count: res.count,
//           },
//         });
//         dispatch(loadingToggleAction(false));
//       }
//     } catch (error) {
//       dispatch(loadingToggleAction(false));
//       dispatch({
//         type: actionTypes.GET_LIST_CLINIC_FAILED,
//       });
//       toast.error("Lấy danh sách thất bại");
//     }
//   };
// };

export const getFilesAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllFile(data);
      console.log("🚀 ~ return ~ res:", res);
      if (res) {
        dispatch({
          type: actionTypes.GET_LIST_FILE_SUCCEED,
          payload: { data: res.data, pagination: res.pagination },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_LIST_FILE_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};
