import actionTypes from "../actions/actionTypes";

const initialState = {
  allcodes: [],
  users: [],
  user: {},
  listClinic: [],
  clinic: {},
  allcodeType: [],
  listSpecialty: [],
  listSpecialtyInClinic: [],
  listHandbook: [],
  schedule: {},
  listPacket: [],
  schedules: [],
  listSpecialtyInHandbook: [],
  listAccountPatient: [],
  prescription: {},
  listRecentMedicalHistory: [],
  listManagers: [],
  userPermissions: "",
  assistants: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CLINIC_SUCCEED: {
      return { ...state, listClinic: action.data };
    }
    case actionTypes.GET_LIST_CLINIC_FAILED: {
      return {
        ...state,
        listClinic: [],
      };
    }
    case actionTypes.GET_CLINIC_SUCCEED: {
      return { ...state, clinic: action.data };
    }
    case actionTypes.GET_CLINIC_FAILED: {
      return {
        ...state,
        clinic: {},
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
