import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  changPassSuccess: false,
  resetPassSuccess: false,
  count: {},
  accountPermission: [],
  // patientInfo: null,
  // isPatientLoggedIn: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    // case actionTypes.PATIENT_LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     isPatientLoggedIn: true,
    //     patientInfo: action.userInfo,
    //   };
    // case actionTypes.PATIENT_LOGIN_FAIL:
    //   return {
    //     ...state,
    //     isPatientLoggedIn: false,
    //     patientInfo: null,
    //   };
    case actionTypes.GET_PERMISSION_LOGIN_SUCCESS:
      return {
        ...state,
        accountPermission: action.data,
      };
    case actionTypes.GET_PERMISSION_LOGIN_FAIL:
      return {
        ...state,
        accountPermission: [],
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        accountPermission: [],
      };
    // case actionTypes.PATIENT_PROCESS_LOGOUT:
    //   return {
    //     ...state,
    //     isPatientLoggedIn: false,
    //     patientInfo: null,
    //   };
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changPassSuccess: true,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassSuccess: true,
      };
    case actionTypes.CLEAR_USER_STATUS:
      return {
        ...state,
        resetPassSuccess: false,
        changPassSuccess: false,
      };
    case actionTypes.GET_ALL_COUNT_DASHBOARD_SUCCESS:
      return {
        ...state,
        count: action.data,
      };

    default:
      return state;
  }
};

export default appReducer;
