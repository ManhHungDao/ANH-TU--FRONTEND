import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: "",
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: "vi",
  systemMenuPath: "/admin",
  doctorMenuPath: "/doctor",
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
  showLoading: false,
  menuOpen: "Trang Chính",
  isSuccess: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };
    case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL:
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };

    // CRUD success
    case actionTypes.CREATE_SUCCESS:
    case actionTypes.UPDATE_SUCCESS:
    case actionTypes.DELETE_SUCCESS:
    case actionTypes.CREATE_SCHEDULE_PATIENT_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
      };
    }
    // CRUD failed
    case actionTypes.CREATE_SCHEDULE_PATIENT_FAILED:
    case actionTypes.CREATE_FAILED:
    case actionTypes.UPDATE_FAILED:
    case actionTypes.DELETE_FAILED: {
      return {
        ...state,
        isSuccess: false,
      };
    }

    // clear status success
    case actionTypes.CLEAR_STATUS: {
      return {
        ...state,
        isSuccess: null,
      };
    }

    // loading
    case actionTypes.LOADING_TOGGLE_ACTION: {
      return {
        ...state,
        showLoading: action.data,
      };
    }
    case actionTypes.SET_MENU: {
      return {
        ...state,
        menuOpen: action.data,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
