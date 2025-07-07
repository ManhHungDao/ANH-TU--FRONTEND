import actionTypes from "./actionTypes";
import {
  resetPasswordApiService,
  changePasswordApiService,
  getAllCountDashboard,
} from "../../services/userService";

import { loadingToggleAction } from "./adminActions";
import { toast } from "react-toastify";

export const adminLoginSuccess = (userInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  userInfo: userInfo,
});
export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => {
  return (dispatch, getState) => {
    localStorage.setItem("permissions", JSON.stringify([]));
    dispatch({
      type: actionTypes.PROCESS_LOGOUT,
    });
  };
};

export const processPatientLogout = () => ({
  type: actionTypes.PATIENT_PROCESS_LOGOUT,
});

export const clearUserStatus = () => ({
  type: actionTypes.CLEAR_USER_STATUS,
});

export const resetPasswordAction = (email) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await resetPasswordApiService(email);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.RESET_PASSWORD_SUCCESS,
        });
        toast.success("Đặt lại mật khẩu thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Đặt lại mật khẩu thất bại");
    }
  };
};

export const changePasswordAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await changePasswordApiService(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CHANGE_PASSWORD_SUCCESS,
        });
        toast.success("Thay đổi mật khẩu thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error(error.response.data.errMessage);
    }
  };
};

export const getAllCountAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllCountDashboard();
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_ALL_COUNT_DASHBOARD_SUCCESS,
          data: res.count,
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error(error.response.data.errMessage);
    }
  };
};
