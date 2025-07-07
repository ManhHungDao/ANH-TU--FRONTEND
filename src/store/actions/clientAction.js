/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  getSingleClinic,
  getAllClinicHomePatient,
  getSuggestClinicPatient,
} from "../../services/clinicService";

import { getAllUserHomePatient } from "../../services/userService";
import { loadingToggleAction } from "./adminActions";
import { toast } from "react-toastify";

// CLINIC
export const getSuggestClinicPatientAction = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        // dispatch(loadingToggleAction(true));
        const res = await getSuggestClinicPatient(id);
        if (res && res.success) {
          dispatch({
            type: actionTypes.PATIENT_GET_LIST_CLINIC_SUCCEED,
            data: res.nearestClinics,
          });
          // dispatch(loadingToggleAction(false));
        } else {
          dispatch({
            type: actionTypes.PATIENT_GET_LIST_CLINIC_FAILED,
          });
          // dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_CLINIC_FAILED,
      });
    }
  };
};

export const getSingleClinicPatientAction = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        // dispatch(loadingToggleAction(true));
        const res = await getSingleClinic(id);
        if (res && res.success) {
          dispatch({
            type: actionTypes.PATIENT_GET_CLINIC_SUCCEED,
            data: res.clinic,
          });
          // dispatch(loadingToggleAction(false));
        } else {
          dispatch({
            type: actionTypes.PATIENT_GET_CLINIC_FAILED,
          });
          // dispatch(loadingToggleAction(false));
        }
      }
    } catch (error) {
      dispatch({
        type: actionTypes.PATIENT_GET_CLINIC_FAILED,
      });
    }
  };
};

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
