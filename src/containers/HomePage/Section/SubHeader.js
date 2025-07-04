/* eslint-disable default-case */
import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { changLanguageApp } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Stack,
  Grid,
  Divider,
  Box,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import SwipeableTemporaryDrawer from "../Section/LeftBar";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const SubHeader = ({ isLoggedIn, processLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenuItem = (link) => {
    navigate(link);
  };
  const handleClickBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Box sx={{ backgroundColor: "#45c3d2" }} className="sub-header">
        <Container>
          <Grid
            container
            sx={{ padding: "10px 2px" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sm={6} md={6}>
              <i
                className="fas fa-long-arrow-alt-left icon-goback"
                onClick={() => navigate(-1)}
              ></i>
            </Grid>
            <Grid item sm={6} md={6}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                className="select-container"
              >
                {isLoggedIn === true && (
                  <>
                    <Button
                      id="basic-button"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClickBtn}
                    >
                      <PersonRoundedIcon sx={{ fontSize: 25, color: "#fff" }} />
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
                  </>
                )}
                <i
                  className="fas fa-bars menu-mobile"
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={handleClick}
                ></i>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <SwipeableTemporaryDrawer
        direction="right"
        show={open}
        setOpen={setOpen}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
