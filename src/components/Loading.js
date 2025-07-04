import React from "react";
import { connect } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ showLoading }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 100000 }}
      open={showLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.app.showLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Loading);
