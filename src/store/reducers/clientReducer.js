import actionTypes from "../actions/actionTypes";
const initialState = {
  listClinic: [],
  listSpecialty: [],
  listUser: [],
  listHandbook: [],
  listPacket: [],
  clinic: {},
  specialty: {},
  handbook: {},
  allcodeType: [],
  listSpecialtyInClinic: [],
  listDoctor: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    // CLINIC
    case actionTypes.PATIENT_GET_LIST_CLINIC_SUCCEED: {
      state.listClinic = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_LIST_CLINIC_FAILED: {
      state.listClinic = [];
      return {
        ...state,
      };
    }
    case actionTypes.PATIENT_GET_CLINIC_SUCCEED: {
      state.clinic = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_CLINIC_FAILED: {
      state.clinic = {};
      return {
        ...state,
      };
    }
    // SPECIALTY
    case actionTypes.GET_LIST_CLINIC_BYID_HOME_SUCCEED: {
      return { ...state, listSpecialtyInClinic: action.data };
    }
    case actionTypes.GET_LIST_CLINIC_BYID_HOME_FAILED: {
      return {
        ...state,
        listSpecialtyInClinic: [],
      };
    }
    case actionTypes.PATIENT_GET_LIST_SPECIALTY_SUCCEED: {
      state.listSpecialty = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_LIST_SPECIALTY_FAILED: {
      state.listSpecialty = [];
      return {
        ...state,
      };
    }
    case actionTypes.PATIENT_SINGLE_SPECIALTY_SUCCEED: {
      state.specialty = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_SINGLE_SPECIALTY_FAILED: {
      state.specialty = {};
      return {
        ...state,
      };
    }
    //USER
    case actionTypes.PATIENT_GET_LIST_USER_SUCCEED: {
      state.listUser = action.data;
      return { ...state };
    }
    case actionTypes.PATIENT_GET_LIST_USER_FAILED: {
      state.listUser = [];
      return {
        ...state,
      };
    }

    case actionTypes.GET_OUT_STANDING_DOCTOR_SUCCEED:
    case actionTypes.GET_SUGGEST_DOCTOR_SUCCEED: {
      state.listDoctor = action.data;
      return { ...state };
    }
    case actionTypes.GET_OUT_STANDING_DOCTOR_FAILED:
    case actionTypes.GET_SUGGEST_DOCTOR_FAILED: {
      state.listDoctor = [];
      return {
        ...state,
      };
    }

    // HANDBOOK
    case actionTypes.GET_LIST_HANDBOOK_HOME_SUCCEED: {
      state.listHandbook = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_HANDBOOK_HOME_FAILED: {
      state.listHandbook = [];
      return {
        ...state,
      };
    }
    case actionTypes.GET_SINGLE_HANDBOOK_SUCCEED: {
      state.handbook = action.data;
      return { ...state };
    }
    case actionTypes.GET_SINGLE_HANDBOOK_FAILED: {
      state.handbook = {};
      return {
        ...state,
      };
    }
    //PACKET
    case actionTypes.GET_ALL_PACKET_HOME_SUCCESS: {
      state.listPacket = action.data;
      return { ...state };
    }
    case actionTypes.GET_ALL_PACKET_HOME_FAILED: {
      state.listPacket = [];
      return {
        ...state,
      };
    }
    // ALLCODE
    case actionTypes.FETCH_ALLCODE_TYPE_PATIENT_SUCCESS: {
      state.allcodeType = action.data;
      return { ...state };
    }
    case actionTypes.FETCH_ALLCODE_TYPE_PATIENT_FAILED: {
      state.allcodeType = [];
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default clientReducer;
