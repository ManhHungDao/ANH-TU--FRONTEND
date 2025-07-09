import actionTypes from "../actions/actionTypes";

const initialState = {
  fileFromServer: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_FILE_SUCCEED: {
      return { ...state, fileFromServer: action.payload };
    }
    case actionTypes.GET_LIST_FILE_FAILED: {
      return {
        ...state,
        fileFromServer: null,
      };
    }
    // case actionTypes.GET_CLINIC_SUCCEED: {
    //   return { ...state, clinic: action.data };
    // }
    // case actionTypes.GET_CLINIC_FAILED: {
    //   return {
    //     ...state,
    //     clinic: {},
    //   };
    // }

    default:
      return state;
  }
};

export default adminReducer;
