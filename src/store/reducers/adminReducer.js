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
    // CODE
    case actionTypes.FETCH_ALLCODE_SUCCESS: {
      return { ...state, allcodes: action.data };
    }
    case actionTypes.FETCH_ALLCODE_FAILED: {
      return { ...state, allcodes: [] };
    }
    case actionTypes.FETCH_ALLCODE_TYPE_SUCCESS: {
      return { ...state, allcodeType: action.data };
    }
    case actionTypes.FETCH_ALLCODE_TYPE_FAILED: {
      return { ...state, allcodeType: [] };
    }
    // USER
    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case actionTypes.FETCH_ALL_USERS_FAILED: {
      return {
        ...state,
        users: [],
      };
    }
    case actionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
      };
    }
    case actionTypes.GET_USER_FAILED: {
      return { ...state, user: {} };
    }

    case actionTypes.GET_ALL_MANAGER_SUCCEED: {
      return {
        ...state,
        listManagers: action.data,
      };
    }
    case actionTypes.GET_ALL_MANAGER_FAILED: {
      return { ...state, listManagers: [] };
    }
    case actionTypes.GET_ROLE_USER_SUCCESS: {
      return {
        ...state,
        userPermissions: action.data,
      };
    }
    case actionTypes.GET_ROLE_USER_FAIL: {
      return { ...state, userPermissions: [] };
    }
    // ASSISTANT
    case actionTypes.FETCH_ALL_ASSISTANT_SUCCEED: {
      return {
        ...state,
        assistants: action.assistants,
      };
    }
    case actionTypes.FETCH_ALL_ASSISTANT_FAILED: {
      return {
        ...state,
        assistants: [],
      };
    }
    // CLINIC
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

    // SPECIALTY
    case actionTypes.GET_LIST_SPECIALTY_SUCCEED: {
      return { ...state, listSpecialty: action.data };
    }
    case actionTypes.GET_LIST_SPECIALTY_FAILED: {
      return {
        ...state,
        listSpecialty: [],
      };
    }
    case actionTypes.GET_LIST_CLINIC_BYID_SUCCEED: {
      return { ...state, listSpecialtyInClinic: action.data };
    }
    case actionTypes.GET_LIST_CLINIC_BYID_FAILED: {
      return {
        ...state,
        listSpecialtyInClinic: [],
      };
    }
    case actionTypes.GET_LIST_HANDBOOK_SUCCEED: {
      return { ...state, listHandbook: action.data };
    }
    case actionTypes.GET_LIST_HANDBOOK_FAILED: {
      return {
        ...state,
        listHandbook: [],
      };
    }
    case actionTypes.GET_LIST_SPECIALTY_IN_HANDBOOK_SUCCEED: {
      return { ...state, listSpecialtyInHandbook: action.data };
    }
    case actionTypes.GET_LIST_SPECIALTY_IN_HANDBOOK_FAILED: {
      return {
        ...state,
        listSpecialtyInHandbook: [],
      };
    }
    // SCHEDULE
    case actionTypes.GET_SCHEDULE_SUCCESS: {
      return { ...state, schedule: action.data };
    }
    case actionTypes.GET_SCHEDULE_FAILED: {
      return {
        ...state,
        schedule: {},
      };
    }
    case actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS: {
      return { ...state, schedules: action.data };
    }
    case actionTypes.GET_SCHEDULE_BY_DATE_FAILED: {
      return {
        ...state,
        schedules: [],
      };
    }
    // PACKET
    case actionTypes.GET_PACKET_PAGINATION_SUCCESS: {
      return { ...state, listPacket: action.data };
    }
    case actionTypes.GET_PACKET_PAGINATION_FAILED: {
      return {
        ...state,
        listPacket: [],
      };
    }

    // ACOUNT PATIENT
    case actionTypes.GET_ALL_ACCOUNT_PATIENT_SUCCESS: {
      return { ...state, listAccountPatient: action.data };
    }
    case actionTypes.GET_ALL_ACCOUNT_PATIENT_FAILED: {
      return {
        ...state,
        listAccountPatient: [],
      };
    }

    // PRESCRIPTION
    case actionTypes.GET_PRESCRTIPTION_ADMIN_SUCCEED: {
      return { ...state, prescription: action.data };
    }
    case actionTypes.GET_PRESCRTIPTION_ADMIN_FAILED: {
      return {
        ...state,
        prescription: {},
      };
    }
    case actionTypes.GET_RECENT_MEDICAL_HISTORY_ADMIN_SUCCEED: {
      return { ...state, listRecentMedicalHistory: action.data };
    }
    case actionTypes.GET_RECENT_MEDICAL_HISTORY_ADMIN_FAILED: {
      return {
        ...state,
        listRecentMedicalHistory: [],
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
