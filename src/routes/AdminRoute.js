import React from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import TableManageUser from "../containers/System/Admin/TableManageUser";
import TableManageClinic from "../containers/System/Clinic/TableManageClinic";
import TableManageSpecialty from "../containers/System/Specialty/TableManageSpecialty";
import Dashboard from "../containers/System/dashboard";
import ResetPassword from "../containers/Auth/ResetPassword";
import Topbar from "../containers/System/global/Topbar";
import Sidebar from "../containers/System/global/Sidebar";
import AddNewUser from "../containers/System/Admin/AddNewUser";
import AddClinic from "../containers/System/Clinic/AddClinic";
import AddSpecialty from "../containers/System/Specialty/AddSpecialty";
import ManageCode from "../containers/System/Allcode/ManageCode";
import AddHandbook from "../containers/System/Handbook/AddHandbook";
import TableManageHandbook from "../containers/System/Handbook/TableManageHandbook";
import ManageUserSchedule from "../containers/System/Admin/ManageUserSchedule";
import TableManageUserSchedule from "../containers/System/Admin/TableManageUserSchedule";
import ManagePacketSchedule from "../containers/System/Clinic/ManagePacketSchedule";
import AddPacket from "../containers/System/Clinic/AddPacket";
import TableManagePacket from "../containers/System/Clinic/TableManagePacket";
import TableManagePacketSchedule from "../containers/System/Clinic/TableManagePacketSchedule";
import TableManageAccountPatient from "../containers/System/Admin/PatientAccount/TableManageAccountPatient";
import DetailAccount from "../containers/System/Admin/PatientAccount/DetailAccount";
import ManageRole from "../containers/System/Allcode/ManageRole";
import TodaySchedule from "../containers/System/Doctor/TodaySchedule";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import MyInfo from "../containers/System/Doctor/MyInfo";
import { CssBaseline } from "@mui/material";
import "./style.css";
import AddNewAssistant from "../containers/System/Assistant/AddNewAssistant";
import TableManageAssistant from "../containers/System/Assistant/TableManageAssistant";
import ManageRoleAssistant from "../containers/System/Doctor/ManageRoleAssistant";

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
            <Route index element={<Dashboard />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route
              path="manage-account-patient"
              element={<TableManageAccountPatient />}
            />
            <Route path="detail-account-patient" element={<DetailAccount />} />
            <Route path="add-user" element={<AddNewUser />} />
            <Route path="manage-user" element={<TableManageUser />} />
            <Route path="add-user-schedule" element={<ManageUserSchedule />} />
            <Route
              path="manage-user-schedule"
              element={<TableManageUserSchedule />}
            />

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
            <Route path="manage-role" element={<ManageRole />} />
            <Route path="manage-code-price" element={<ManageCode />} />
            <Route path="manage-code-payment" element={<ManageCode />} />
            <Route path="manage-code-province" element={<ManageCode />} />
            <Route path="manage-code-time" element={<ManageCode />} />
            <Route path="manage-code-specialty" element={<ManageCode />} />
            <Route path="manage-code-packet" element={<ManageCode />} />
            <Route path="add-handbook" element={<AddHandbook />} />
            <Route path="manage-handbook" element={<TableManageHandbook />} />

            {/* route topbar */}

            <Route path="view-myinfo" element={<MyInfo />} />
            <Route path="view-my-schedule" element={<TodaySchedule />} />
            <Route path="manage-my-schedule" element={<ManageSchedule />} />

            <Route path="*" element={<Navigate replace to="/admin" />} />

            {/* route manage assistant */}
            <Route path="add-assistant" element={<AddNewAssistant />} />
            <Route path="manage-assistant" element={<TableManageAssistant />} />
            <Route
              path="manage-role-assistant"
              element={<ManageRoleAssistant />}
            />
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
