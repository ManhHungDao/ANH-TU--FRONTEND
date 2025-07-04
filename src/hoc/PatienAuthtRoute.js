import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

export const PatienAuthtRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.patient.isPatientLoggedIn,
});

export default connect(mapStateToProps)(PatienAuthtRoute);
