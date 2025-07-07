import actionTypes from "./actionTypes";

import { getSinglePrescription } from "../../services/prescriptionService";

import { loadingToggleAction } from "./adminActions";

export const getSinglePrescriptionAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSinglePrescription(id);
      if (res.success === true) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_PRESCRTIPTION_PATIENT_SUCCEED,
          data: res.prescription,
        });
      } else if (res.success === false) {
        dispatch({
          type: actionTypes.GET_PRESCRTIPTION_PATIENT_FAILED,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRESCRTIPTION_PATIENT_FAILED,
      });
      dispatch(loadingToggleAction(false));
    }
  };
};
