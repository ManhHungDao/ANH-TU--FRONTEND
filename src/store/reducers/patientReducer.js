import actionTypes from "../actions/actionTypes";

const initialState = {
  patientInfo: null,
  isPatientLoggedIn: false,
  listBookingByEmail: [],
  prescription: {},
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PATIENT_LOGIN_SUCCESS:
      return {
        ...state,
        isPatientLoggedIn: true,
        patientInfo: action.data,
      };
    case actionTypes.PATIENT_LOGIN_FAIL:
      return {
        ...state,
        isPatientLoggedIn: false,
        patientInfo: null,
      };
    case actionTypes.PATIENT_PROCESS_LOGOUT:
      return {
        ...state,
        isPatientLoggedIn: false,
        patientInfo: null,
      };
    case actionTypes.GET_ALL_BOOKING_BY_EMAIL_SUCCEED:
      return {
        ...state,
        listBookingByEmail: action.data,
      };
    case actionTypes.GET_ALL_BOOKING_BY_EMAIL_FAILED:
      return {
        ...state,
        listBookingByEmail: [],
      };

    case actionTypes.GET_PRESCRTIPTION_PATIENT_SUCCEED:
      return {
        ...state,
        prescription: action.data,
      };
    case actionTypes.GET_PRESCRTIPTION_PATIENT_FAILED:
      return {
        ...state,
        prescription: {},
      };

    default:
      return state;
  }
};

export default patientReducer;
