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
import { getAllAssistant } from "../../services/assistantService";

import {
  updateClinic,
  getSingleClinic,
  getAllClinic,
  createClinic,
  deleteClinc,
} from "../../services/clinicService";
import {
  updateSpecialty,
  getSingleSpecialty,
  getAllSpecialty,
  createSpecialty,
  deleteSpecialty,
  getClinicById,
} from "../../services/specialtySerivce.js";
import {
  getAllcode,
  createAllcode,
  updateAllcode,
  deleteAllcode,
  getAllCodeByType,
} from "../../services/allcodeService";
import {
  createHandbook,
  getAllHandbook,
  deleteHandbook,
  updateHandbook,
  getAllSpecialtyInHandbook,
} from "../../services/handbookService";
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
  createPacketService,
  deletePacket,
  updatePacket,
  getAllPacket,
} from "../../services/packetService";

import {
  createPrescription,
  getSinglePrescription,
  getRecentMedicalHistory,
} from "../../services/prescriptionService";

import { getAllAccountPatient } from "../../services/patientService";

import { toast } from "react-toastify";

export const loadingToggleAction = (status) => {
  return {
    type: actionTypes.LOADING_TOGGLE_ACTION,
    data: status,
  };
};

export const fetchAllcodeAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllcode();
      if (res && res.success) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SUCCESS,
          data: res.allcodes,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_FAILED,
      });
      toast.error("Lấy tất cả mã thất bại");
    }
  };
};
export const fetchAllcodeByTypeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeByType(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_TYPE_SUCCESS,
          data: {
            list: res.allcodes,
            count: res.count,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_TYPE_FAILED,
      });
      toast.error(`Lấy tất cả mã ${data.type ? data.type : ""} thất bại`);
    }
  };
};
export const createAllCodeAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createAllcode(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        toast.success("Tạo mã thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      if (error.response.data.error.statusCode === 409)
        toast.warning("Mã định danh đã tồn tại");
      else toast.error("Tạo mã thất bại");
    }
  };
};

export const updateAllCodeAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateAllcode(id, data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        toast.success("Cập nhập mã thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      if (error.response.data.error.statusCode === 409)
        toast.warning("Mã định danh đã tồn tại");
      else toast.error("Cập nhập mã thất bại");
    }
  };
};

export const deleteAllCodeAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteAllcode(id);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        toast.success("Xóa mã thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa mã thất bại");
    }
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
export const createHandbookAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createHandbook(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Tạo cẩm nang thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo cẩm nang thất bại");
    }
  };
};

export const getAllHandbookAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllHandbook(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_HANDBOOK_SUCCEED,
          data: { list: res.handbooks, count: res.count },
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_HANDBOOK_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const deleteHandbookAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deleteHandbook(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Xóa cẩm nang thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa cẩm nang thất bại");
    }
  };
};

export const updateHandbookAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updateHandbook(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập cẩm nang thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      toast.error("Cập nhập cẩm nang thất bại");
    }
  };
};

export const getAllSpecialtyInHandbookAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllSpecialtyInHandbook(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_LIST_SPECIALTY_IN_HANDBOOK_SUCCEED,
          data: res.list,
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_LIST_SPECIALTY_IN_HANDBOOK_FAILED,
      });
    }
  };
};

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

// PACKET
export const createPacketAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await createPacketService(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.CREATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Tạo gói khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.CREATE_FAILED,
      });
      toast.error("Tạo gói khám thất bại");
    }
  };
};

export const deletePacketAction = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await deletePacket(id);
      if (res && res.success) {
        dispatch({
          type: actionTypes.DELETE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Xóa gói khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.DELETE_FAILED,
      });
      toast.error("Xóa gói khám thất bại");
    }
  };
};

export const getAllPacketAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllPacket(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_PACKET_PAGINATION_SUCCESS,
          data: {
            list: res.packets,
            count: res.count,
          },
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_PACKET_PAGINATION_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

export const updatePacketAction = (id, data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await updatePacket(id, data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.UPDATE_SUCCESS,
        });
        dispatch(loadingToggleAction(false));
        toast.success("Cập nhập gói khám thành công");
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.UPDATE_FAILED,
      });
      toast.error("Cập nhập gói khám thất bại");
    }
  };
};

// ACCOUNT PATIENT

export const getAllAccountPatientAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllAccountPatient(data);
      if (res && res.success) {
        dispatch({
          type: actionTypes.GET_ALL_ACCOUNT_PATIENT_SUCCESS,
          data: {
            list: res.users,
            count: res.count,
          },
        });
        dispatch(loadingToggleAction(false));
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.GET_ALL_ACCOUNT_PATIENT_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};

// PRESCRIPTION

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

export const getAllAssistantAction = (data) => {
  return async (dispatch, getState) => {
    try {
      dispatch(loadingToggleAction(true));
      const res = await getAllAssistant(data);
      if (res && res.success) {
        dispatch(loadingToggleAction(false));
        dispatch({
          type: actionTypes.FETCH_ALL_ASSISTANT_SUCCEED,
          assistants: {
            list: res.assistants,
            count: res.count,
          },
        });
      }
    } catch (error) {
      dispatch(loadingToggleAction(false));
      dispatch({
        type: actionTypes.FETCH_ALL_ASSISTANT_FAILED,
      });
      toast.error("Lấy danh sách thất bại");
    }
  };
};
