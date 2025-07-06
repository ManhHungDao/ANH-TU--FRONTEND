import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../containers/System/dashboard";
import Topbar from "../containers/System/global/Topbar";
import DoctorSideBar from "../containers/System/global/DoctorSideBar";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import { CssBaseline } from "@mui/material";
import TodaySchedule from "../containers/System/Doctor/TodaySchedule";
import MyInfo from "../containers/System/Doctor/MyInfo";
import "./style.css";
import ManageRoleAssistant from "../containers/System/Doctor/ManageRoleAssistant";

const DoctorRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <CssBaseline />
      <div className="app">
        <DoctorSideBar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="view-myinfo" element={<MyInfo />} />
            <Route path="schedule-today" element={<TodaySchedule />} />
            <Route path="manage-schedule" element={<ManageSchedule />} />
            <Route
              path="manage-role-assistant"
              element={<ManageRoleAssistant />}
            />
            <Route path="*" element={<Navigate replace to="/doctor" />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRoute);
