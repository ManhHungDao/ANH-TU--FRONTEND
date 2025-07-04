import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { path } from "../utils";
import AccountInfo from "../containers/Patient/Account/AccountInfo";
import ChangePassword from "../containers/Patient/Account/ChangePassword";
import ManageBooking from "../containers/Patient/Account/ManageBooking";

const PatientRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/account" element={<AccountInfo />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/booking" element={<ManageBooking />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
};

export default PatientRoute;
