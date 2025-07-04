import React from "react";
import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import * as actions from "../../../store/actions";
import { connect, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Topbar = ({ processLogout, userInfo }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePass = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/admin/reset-password");
  };
  const handleChangeManageMySchedule = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/admin/manage-my-schedule");
  };
  const handleViewMySchedule = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/admin/view-my-schedule");
  };
  const handleViewMyInfo = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/admin/view-myinfo");
  };
  const handleViewMyInfoDoctor = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/doctor/view-myinfo");
  };
  const handleDoctorChangePass = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/doctor/reset-password");
  };

  const handleViewMyInfoAssistant = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/assistant/view-myinfo");
  };
  const handleAssistantChangePass = () => {
    dispatch({ type: actions.SET_MENU, data: "" });
    navigate("/assistant/reset-password");
  };

  const handleLogout = () => {
    navigate("/system-login");
    processLogout();
  };
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonOutlinedIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* {userInfo.roleId !== "R3" ? (
          <>
            <MenuItem onClick={handleViewMyInfo}>Thông tin cá nhân</MenuItem>

            <MenuItem onClick={handleViewMySchedule}>
              Lịch khám cá nhân
            </MenuItem>
            <MenuItem onClick={handleChangeManageMySchedule}>
              Quản lý lịch khám
            </MenuItem>
            <MenuItem onClick={handleChangePass}>Đổi mật khẩu</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleViewMyInfoDoctor}>
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleDoctorChangePass}>Đổi mật khẩu</MenuItem>
          </>
        )} */}
        {userInfo.roleId === "R3" && (
          <>
            <MenuItem onClick={handleViewMyInfoDoctor}>
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleDoctorChangePass}>Đổi mật khẩu</MenuItem>
          </>
        )}
        {userInfo.roleId === "R4" && (
          <>
            <MenuItem onClick={handleViewMyInfoAssistant}>
              Thông tin cá nhân
            </MenuItem>
            <MenuItem onClick={handleAssistantChangePass}>
              Đổi mật khẩu
            </MenuItem>
          </>
        )}
        {userInfo.roleId !== "R3" && userInfo.roleId !== "R4" && (
          <>
            <MenuItem onClick={handleViewMyInfo}>Thông tin cá nhân</MenuItem>

            <MenuItem onClick={handleViewMySchedule}>
              Lịch khám cá nhân
            </MenuItem>
            <MenuItem onClick={handleChangeManageMySchedule}>
              Quản lý lịch khám
            </MenuItem>
            <MenuItem onClick={handleChangePass}>Đổi mật khẩu</MenuItem>
          </>
        )}

        <MenuItem onClick={handleLogout}>Thoát</MenuItem>
      </Menu>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
