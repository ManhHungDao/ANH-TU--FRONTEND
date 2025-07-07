/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";

import { getAllClinic } from "../../services/clinicService";

import { toast } from "react-toastify";

export const loadingToggleAction = (status) => {
  return {
    type: actionTypes.LOADING_TOGGLE_ACTION,
    data: status,
  };
};

// CLINIC ACTION

export const getListClinicAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllClinic(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_CLINIC_SUCCEED,
          data: {
            list: res.clinics,
            count: res.count,
          },
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};
