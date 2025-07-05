/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { connect } from "react-redux";
import { changLanguageApp } from "../../../store/actions";
import { Grid, Stack, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import * as actions from "../../../store/actions";

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
  const returnHome = () => {
    navigate(`/packet`);
  };
  const handleClickMenuItem = (link) => {
    setOpen(false);
    navigate(link);
  };
  return (
    <>
      <div className="home-header-container d-flex align-items-center">
        <div className="container">
          <Grid
            container
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <div
                className="header-logo"
                style={{ cursor: "pointer" }}
                onClick={returnHome}
              ></div>
            </Grid>

            <Grid
              item
              sm={6}
              md={3}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickBtn}
              >
                <PersonRoundedIcon sx={{ fontSize: 25 }} />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => handleClickMenuItem("/patient/account")}
                >
                  Thông tin cá nhân
                </MenuItem>
                <MenuItem
                  onClick={() => handleClickMenuItem("/patient/booking")}
                >
                  Đơn đặt lịch
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleClickMenuItem("/patient/change-password")
                  }
                >
                  Đổi mật khẩu
                </MenuItem>
                <MenuItem onClick={processLogout}>Thoát</MenuItem>
              </Menu>
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
