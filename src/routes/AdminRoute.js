import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import TableManageClinic from "../containers/System/Clinic/TableManageClinic";
import TableManageSpecialty from "../containers/System/Specialty/TableManageSpecialty";
import Topbar from "../containers/System/global/Topbar";
import Sidebar from "../containers/System/global/Sidebar";
import AddClinic from "../containers/System/Clinic/AddClinic";
import AddSpecialty from "../containers/System/Specialty/AddSpecialty";
import AddHandbook from "../containers/System/Handbook/AddHandbook";
import TableManageHandbook from "../containers/System/Handbook/TableManageHandbook";
import ManagePacketSchedule from "../containers/System/Clinic/ManagePacketSchedule";
import AddPacket from "../containers/System/Clinic/AddPacket";
import TableManagePacket from "../containers/System/Clinic/TableManagePacket";
import TableManagePacketSchedule from "../containers/System/Clinic/TableManagePacketSchedule";
import TableManageAccountPatient from "../containers/System/Admin/PatientAccount/TableManageAccountPatient";
import DetailAccount from "../containers/System/Admin/PatientAccount/DetailAccount";
import TodaySchedule from "../containers/System/Doctor/TodaySchedule";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import MyInfo from "../containers/System/Doctor/MyInfo";
import { CssBaseline } from "@mui/material";
import "./style.css";

const AdminRoute = ({ systemMenuPath, isLoggedIn }) => {
  const [isSidebar, setIsSidebar] = React.useState(true);
  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Routes>
            <Route
              path="manage-account-patient"
              element={<TableManageAccountPatient />}
            />
            <Route path="detail-account-patient" element={<DetailAccount />} />

            <Route path="add-clinic" element={<AddClinic />} />
            <Route path="manage-clinic" element={<TableManageClinic />} />
            <Route path="add-packet" element={<AddPacket />} />
            <Route path="manage-packet" element={<TableManagePacket />} />
            <Route
              path="add-packet-schedule"
              element={<ManagePacketSchedule />}
            />
            <Route
              path="manage-packet-schedule"
              element={<TableManagePacketSchedule />}
            />
            <Route path="add-specialty" element={<AddSpecialty />} />
            <Route path="manage-specialty" element={<TableManageSpecialty />} />

            <Route path="add-handbook" element={<AddHandbook />} />
            <Route path="manage-handbook" element={<TableManageHandbook />} />
            {/* route topbar */}
            <Route path="view-myinfo" element={<MyInfo />} />
            <Route path="view-my-schedule" element={<TodaySchedule />} />
            <Route path="manage-my-schedule" element={<ManageSchedule />} />
            <Route path="*" element={<Navigate replace to="/admin" />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminRoute);
