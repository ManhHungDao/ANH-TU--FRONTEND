import actionTypes from "./actionTypes";

export const appStartUpComplete = () => ({
  type: actionTypes.APP_START_UP_COMPLETE,
});

export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

export const changLanguageApp = (languageInput) => ({
  type: actionTypes.CHANGE_LANGUAGE,
  language: languageInput,
});

export const clearStatus = () => {
  return {
    type: actionTypes.CLEAR_STATUS,
  };
};

export const SET_MENU = actionTypes.SET_MENU;
