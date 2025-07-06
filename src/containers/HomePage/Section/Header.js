/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import { changLanguageApp } from "../../../store/actions";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import * as actions from "../../../store/actions";
import MenuAccount from "../Section/MenuAccount";

const HomeHeader = ({ processLogout, isLoggedIn }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenuItem = (link) => {
    setOpen(false);
    navigate(link);
  };
  return (
    <>
      <div className="home-header-container d-flex align-items-center">
        <div className="container">
          <Grid container display={"flex"} justifyContent={"flex-end"}>
            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <MenuAccount />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.patient.isPatientLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
    processLogout: () => dispatch(actions.processPatientLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
