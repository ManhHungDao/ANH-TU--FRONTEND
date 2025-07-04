/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";

import userReducer from "./userReducer";

import adminReducer from "./adminReducer";

import clientReducer from "./clientReducer";

import patientReducer from "./patientReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};
const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};
const patientPersistConfig = {
  ...persistCommonConfig,
  key: "patient",
  whitelist: ["isPatientLoggedIn", "patientInfo"],
};

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    patient: persistReducer(patientPersistConfig, patientReducer),
    admin: adminReducer,
    client: clientReducer,
  });
