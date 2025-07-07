/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import { getAllClinicHomePatient } from "../../services/clinicService";

export const getListClinicHomePatientAction = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllClinicHomePatient();
      if (res && res.success) {
        console.log("🚀 ~ return ~ res:", res);
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_GET_LIST_CLINIC_SUCCEED,
          data: res.clinics,
        });
      }
    } catch (error) {
      console.log("🚀 ~ file: patientAction.js:64 ~ return ~ error:");
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_CLINIC_FAILED,
      });
    }
  };
};

// U
