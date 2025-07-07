/* eslint-disable no-lone-blocks */
import actionTypes from "./actionTypes";
import {
  updateUserService,
  createNewUserService,
  getAllUserService,
  getSingleUserService,
  deleteUserService,
  getAllManager,
  upsertRoleUser,
  getRoleUser,
} from "../../services/userService";

import {
  updateClinic,
  getSingleClinic,
  getAllClinic,
  createClinic,
  deleteClinc,
} from "../../services/clinicService";
import {
  updateSpecialty,
  getAllSpecialty,
  createSpecialty,
  deleteSpecialty,
  getClinicById,
} from "../../services/specialtySerivce.js";

import {
  upsertSchedule,
  getSingleUserSchedule,
  deleteSchedule,
  sentMailPatient,
  getScheduleUserByDate,
  updateStatus,
  getSchedulePacketByDate,
  getSinglePacketSchedule,
} from "../../services/scheduleService";

import {
  createPrescription,
  getSinglePrescription,
  getRecentMedicalHistory,
} from "../../services/prescriptionService";

import { toast } from "react-toastify";

export const loadingToggleAction = (status) => {
  return {
    type: actionTypes.LOADING_TOGGLE_ACTION,
    data: status,
  };
};

// USER ACTION

export const upsertRoleUserAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await upsertRoleUser(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        toast.success("Cập nhập quyền thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Đã xảy ra lỗi");
    }
  };
};

export const getRoleUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getRoleUser(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_ROLE_USER_SUCCESS,
          data: res.permissions,
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_ROLE_USER_FAIL,
      });
    }
  };
};

export const getAllManagerAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllManager();
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_ALL_MANAGER_SUCCEED,
          data: res.managers,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_ALL_MANAGER_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const createNewUserAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createNewUserService(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Tạo người dùng thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      if (error.response.data.error.code === 11000)
        toast.error("Email đã tồn tại");
      else toast.error("Tạo người dùng thất bại");
    }
  };
};

export const getSingleUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSingleUserService(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
      }
      dispatch({
        type: actionTypes.GET_USER_SUCCESS,
        data: res.user,
      });
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_USER_FAILED,
      });
      toast.error("Lấy thông tin người dùng thất bại");
    }
  };
};

export const getAllUserAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllUserService(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.FETCH_ALL_USERS_SUCCESS,
          users: {
            list: res.users,
            count: res.count,
          },
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.FETCH_ALL_USERS_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const updateUserAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateUserService(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập thông tin thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      if (error.response.data.error.code === 11000)
        toast.error("Email đã tồn tại");
      else toast.error("Tạo người dùng thất bại");
    }
  };
};

export const deleteUserAction = (id) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await deleteUserService(id);
        if (res && res.success) {
          dispatch(loadingToggleAction(false));
          dispatch({
            type: actionTypes.DELETE_SUCCESS,
          });
          toast.success("Xóa người dùng thành công");
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa người dùng thất bại");
    }
  };
};

// CLINIC ACTION
export const createClinicAction = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createClinic(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
          });
          dispatch(loadingToggleAction(false));
          toast.success("Tạo phòng khám thành công");
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo phòng khám thất bại");
    }
  };
};

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

export const getSingleClinicAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSingleClinic(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_CLINIC_SUCCEED,
          data: res.clinic,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_CLINIC_FAILED,
      });
      toast.error("Lấy thông tin phòng khám thất bại");
    }
  };
};

export const updateClinicAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateClinic(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập thông tin thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Cập nhập thông tin thất bại");
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
    }
  };
};

export const deleteClincAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteClinc(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        toast.success("Xóa phòng khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa phòng khám thất bại");
    }
  };
};

// SPECIALTY
export const createSpecialtyAction = (data) => {
  return async (dispatch, getState) => {
    try {
      {
        dispatch(loadingToggleAction(true));
        const res = await createSpecialty(data);
        if (res && res.success) {
          dispatch({
            type: actionTypes.CREATE_SUCCESS,
          });
          dispatch(loadingToggleAction(false));
          toast.success("Tạo chuyên khoa thành công");
        }
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo chuyên khoa thất bại");
    }
  };
};

export const getAllSpecialtyAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllSpecialty(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_SPECIALTY_SUCCEED,
          data: { list: res.specialties, count: res.count },
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_SPECIALTY_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const deleteSpecialtyAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteSpecialty(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Xóa chuyên khoa thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa chuyên khoa thất bại");
    }
  };
};

export const getSpecialtyByClinicIdAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getClinicById(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_CLINIC_BYID_SUCCEED,
          data: res.specialties,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_CLINIC_BYID_FAILED,
      });
      toast.error("Lấy danh sách chuyên khoa thất bại");
    }
  };
};

export const updateSpecialtyAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateSpecialty(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
          data: res.specialties,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập chuyên khoa thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      toast.error("Cập nhập chuyên khoa thất bại");
    }
  };
};

// handbook
// SCHEDULE
export const upsertScheduleAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await upsertSchedule(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Tạo lịch khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo lịch khám thất bại");
    }
  };
};

export const getSingleUserScheduleAction = (id, date) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSingleUserSchedule(id, date);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_SCHEDULE_SUCCESS,
          data: res.schedule,
        });
        // dispatch(loadingToggleAction(false));
      } else {
        dispatch({
          type: actionTypes.GET_SCHEDULE_FAILED,
        });
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_SCHEDULE_FAILED,
      });
    }
  };
};

export const getSinglePacketScheduleAction = (id, date) => {
  return async (dispatch, getState) => {
    try {
      // dispatch(loadingToggleAction(true));
      const res = await getSinglePacketSchedule(id, date);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_SCHEDULE_SUCCESS,
          data: res.schedule,
        });
        // dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      // dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_SCHEDULE_FAILED,
      });
    }
  };
};

export const deleteScheduleAction = (id, date) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteSchedule(id, date);
      if (res && res.success) {
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Xóa thành công lịch khám");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa thất bại lịch khám");
    }
  };
};

export const updateStatusScheduleAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateStatus(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập trạng thái lịch khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      toast.error("Cập nhập trạng thái lịch khám thất bại");
    }
  };
};

export const getUserScheduleByDateAction = (date) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getScheduleUserByDate(date);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS,
          data: {
            list: res.schedules,
            count: res.count,
          },
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_SCHEDULE_BY_DATE_FAILED,
      });
      toast.error("Lấy lịch khám thất bại");
    }
  };
};

export const getPacketScheduleByDateAction = (date) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSchedulePacketByDate(date);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS,
          data: {
            list: res.schedules,
            count: res.count,
          },
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_SCHEDULE_BY_DATE_FAILED,
      });
      toast.error("Lấy lịch khám thất bại");
    }
  };
};

export const sentMailAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await sentMailPatient(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        toast.success("Gửi thư thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Gửi thư thất bại");
    }
  };
};
export const createPrescriptionAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createPrescription(data);
      if (!res) {
        toast.error("Cập nhập đơn thuốc tài khoản thất bại");
      }
      dispatch(loadingToggleAction(false));
    } catch (error) {
      dispatch(loadingToggleAction(false));
      toast.error("Cập nhập đơn thuốc tài khoản thất bại");
    }
  };
};

export const getSinglePrescriptionAdminAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getSinglePrescription(id);
      if (res.success === true) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_PRESCRTIPTION_ADMIN_SUCCEED,
          data: res.prescription,
        });
      } else if (res.success === false) {
        dispatch({
          type: actionTypes.GET_PRESCRTIPTION_ADMIN_FAILED,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PRESCRTIPTION_ADMIN_FAILED,
      });
      dispatch(loadingToggleAction(false));
    }
  };
};

export const getRecentMedicalHistoryAction = (email) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getRecentMedicalHistory(email);
      if (res.success === true) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.GET_RECENT_MEDICAL_HISTORY_ADMIN_SUCCEED,
          data: res.listResult,
        });
      } else if (res.success === false) {
        dispatch({
          type: actionTypes.GET_RECENT_MEDICAL_HISTORY_ADMIN_FAILED,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_RECENT_MEDICAL_HISTORY_ADMIN_FAILED,
      });
      dispatch(loadingToggleAction(false));
    }
  };
};

// ASSISTANT
