import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../containers/System/dashboard";
import Topbar from "../containers/System/global/Topbar";
import { CssBaseline } from "@mui/material";
import "./style.css";
import AssistantSideBar from "../containers/System/global/AssistantSideBar";
import AssistantInfo from "../containers/System/Assistant/topbar/AssistantInfo";
import AssistantChangePassword from "../containers/System/Assistant/topbar/AssistantChangePassword";
import AssistantTodaySchedule from "../containers/System/Assistant/AssistantTodaySchedule";
import AssistantManageSchedule from "../containers/System/Assistant/AssistantManageSchedule";

const AssistantRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <CssBaseline />
      <div className="app">
        <AssistantSideBar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="view-myinfo" element={<AssistantInfo />} />
            <Route
              path="reset-password"
              element={<AssistantChangePassword />}
            />
            <Route
              path="schedule-doctor-today"
              element={<AssistantTodaySchedule />}
            />
            <Route
              path="manage-schedule-doctor"
              element={<AssistantManageSchedule />}
            />
            <Route path="*" element={<Navigate replace to="/assistant" />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AssistantRoute);
