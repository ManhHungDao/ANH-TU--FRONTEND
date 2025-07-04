import actionTypes from "./actionTypes";

import {
  patientLogin,
  getAllBookingByEmail,
  updateInforAccount,
  patientChangePassword,
} from "../../services/patientService";

import {
  getSuggestDoctorRecent,
  getOutStandingDoctor,
} from "../../services/patientService";

import { getSinglePrescription } from "../../services/prescriptionService";

import { loadingToggleAction } from "./adminActions";
import { toast } from "react-toastify";

export const patientLoginAction = (email, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await patientLogin(email, password);
      if (res && res.success) {
        dispatch({
          type: actionTypes.PATIENT_LOGIN_SUCCESS,
          data: res.user,
        });
        dispatch(loadingToggleAction(false));
      } else {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.PATIENT_LOGIN_FAIL,
        });
        toast.error("Đăng nhập thất bại, kiểm tra lại thông tin!");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.PATIENT_LOGIN_FAIL,
      });
      toast.error("Đăng nhập thất bại, kiểm tra lại thông tin!");
    }
  };
};

export const updateInforAccountAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateInforAccount(id, data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập thông tin thành công");
      } else {
        dispatch(loadingToggleAction(false));
        toast.error("Cập nhập thông tin thất bại");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Cập nhập thông tin thất bại");
    }
  };
};

export const changePasswordAccountAction = (email, oldPass, newPass) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await patientChangePassword(email, oldPass, newPass);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        });
        toast.success("Cập nhập mật khẩu thành công");
      } else {
        dispatch(loadingToggleAction(false));
        toast.error("Cập nhập mật khẩu thất bại");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error(error.response.data.errMessage);
    }
  };
};

export const getAllBookingByEmailAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      // xóa mô tả đơn thuốc
      dispatch({
        type: actionTypes.GET_PRESCRTIPTION_PATIENT_FAILED,
      });
      const res = await getAllBookingByEmail(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_ALL_BOOKING_BY_EMAIL_SUCCEED,
          data: { list: res.schedule, count: res.count },
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_BOOKING_BY_EMAIL_FAILED,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_BOOKING_BY_EMAIL_FAILED,
      });
      dispatch(loadingToggleAction(false));
    }
  };
};

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

export const getSuggestDoctorRecentAction = (email) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSuggestDoctorRecent(email);
      if (res.success === true) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_SUGGEST_DOCTOR_SUCCEED,
          data: res.doctorsRecent,
        });
      } else if (res.success === false) {
        dispatch({
          type: actionTypes.GET_SUGGEST_DOCTOR_FAILED,
        });
        // dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_SUGGEST_DOCTOR_FAILED,
      });
      // dispatch(loadingToggleAction(false));
    }
  };
};

export const getOutStandingDoctorAction = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getOutStandingDoctor();
      if (res.success === true) {
        // dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_OUT_STANDING_DOCTOR_SUCCEED,
          data: res.outStandingDoctor,
        });
      } else if (res.success === false) {
        dispatch({
          type: actionTypes.GET_OUT_STANDING_DOCTOR_FAILED,
        });
        // dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_OUT_STANDING_DOCTOR_FAILED,
      });
      // dispatch(loadingToggleAction(false));
    }
  };
};
