/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  getSingleClinic,
  getAllClinicHomePatient,
  getSuggestClinicPatient,
} from "../../services/clinicService";
import {
  getPopularHomePatient,
  getSingleSpecialty,
  getClinicById,
} from "../../services/specialtySerivce";
import {
  getAllHandbookHomePatient,
  getSingleHandbook,
} from "../../services/handbookService";
import { getAllUserHomePatient } from "../../services/userService";
import {
  createUserBookingSchedule,
  sentMailPatient,
} from "../../services/scheduleService";
import { getAllPacket } from "../../services/packetService";
import { getAllCodeByType } from "../../services/allcodeService";
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

// SPECIALTY
export const getSpecialtyByClinicIdHomeAction = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await getClinicById(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_CLINIC_BYID_HOME_SUCCEED,
          data: res.specialties,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_BYID_HOME_FAILED,
      });
    }
  };
};

export const fetchAllcodeByTypeHomeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeByType(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_TYPE_PATIENT_SUCCESS,
          data: {
            list: res.allcodes,
            count: res.count,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_TYPE_PATIENT_FAILED,
      });
    }
  };
};

export const getListSpecialtyHomePatientAction = (name) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getPopularHomePatient(name);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_GET_LIST_SPECIALTY_SUCCEED,
          data: res.specialties,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_SPECIALTY_FAILED,
      });
    }
  };
};

export const getSingleSpecialtyPatientAction = (id) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSingleSpecialty(id);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_SINGLE_SPECIALTY_SUCCEED,
          data: res.specialty,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_SINGLE_SPECIALTY_FAILED,
      });
    }
  };
};

// USER
export const getListUserHomePatientAction = (name) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllUserHomePatient(name);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_GET_LIST_USER_SUCCEED,
          data: res.users,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_GET_LIST_USER_FAILED,
      });
    }
  };
};

// HANBOOK

export const getAllHandbookHomePatientAction = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllHandbookHomePatient(data);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_LIST_HANDBOOK_HOME_SUCCEED,
          data: {
            list: res.handbooks,
            count: res.count,
          },
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_HANDBOOK_HOME_FAILED,
      });
    }
  };
};

export const getSingleHandbookAction = (id) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSingleHandbook(id);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_SINGLE_HANDBOOK_SUCCEED,
          data: res.handbook,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_SINGLE_HANDBOOK_FAILED,
      });
    }
  };
};

// PACKET

export const getAllPacketPatientHomeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getAllPacket(data);
      if (res && res.success) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_ALL_PACKET_HOME_SUCCESS,
          data: {
            list: res.packets,
            count: res.count,
          },
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_ALL_PACKET_HOME_FAILED,
      });
    }
  };
};

// EMAIL

export const sentMailConfirmAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await sentMailPatient(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
      } else {
        dispatch(loadingToggleAction(false));
        toast.error("Gửi thư thất bại");
      }
    } catch (error) {
      console.log("🚀 ~ file: patientAction.js:295 ~ return ~ error:", error);
      dispatch(loadingToggleAction(false));
      toast.error("Gửi thư thất bại");
    }
  };
};
