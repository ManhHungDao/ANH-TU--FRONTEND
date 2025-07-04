import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import { useDispatch } from "react-redux";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlaylistAddCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCircleOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";

const Item = ({ title, to, icon, isCollapsed, selected, setSelected }) => {
  const dispatch = useDispatch();
  const handleSelected = () => {
    setSelected(title);
    dispatch({ type: actions.SET_MENU, data: title });
  };
  return (
    <MenuItem
      active={title === selected}
      onClick={() => handleSelected()}
      icon={icon}
    >
      {!isCollapsed && <Typography>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const LogOut = ({ title, to, icon, processLogout, isCollapsed }) => {
  return (
    <MenuItem onClick={processLogout} icon={icon}>
      {!isCollapsed && <Typography>{title}</Typography>}
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ userInfo, menuOpen, processLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(menuOpen);
  }, [menuOpen]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#262b40 !important`,
          minHeight: "100vh ",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 5px 5px 20px !important",
          color: "#eaedf2 !important",
        },
        "& .pro-inner-item:hover": {
          color: "#fff !important",
          backgroundColor: "#2e3650 !important",
          borderRadius: "5px",
        },
        "& .pro-menu-item": {
          padding: "5px 0 ",
        },
        "& .pro-menu-item.active": {
          color: "#f3f3f3 !important",
          border: "1px solid #eaedf2 !important",
          borderRadius: "5px",
          backgroundColor: "#2e3650 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              padding: "5px 0 ",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10px"
              >
                <Typography variant="h5" color="#f3f3f3">
                  HEALTHCARE
                </Typography>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{ color: "#f3f3f3" }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{ width: "90%", paddingLeft: "5%" }}
          >
            <Item
              title="Trang Chính"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              isCollapsed={isCollapsed}
            />
            <PermissionsGate scopes={[scopes.PATIENT_ACCESS]}>
              <SubMenu
                title={isCollapsed ? "" : "Người dùng"}
                icon={<PermIdentityOutlinedIcon />}
              >
                <Item
                  title="Danh sách tài khoản"
                  to="/admin/manage-account-patient"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                <Item
                  title="Chi tiết tài khoản"
                  to="/admin/detail-account-patient"
                  icon={<InfoOutlinedIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
              </SubMenu>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.USER_ACCESS]}>
              <SubMenu
                title={isCollapsed ? "" : "Bác sĩ"}
                icon={<PermIdentityOutlinedIcon />}
              >
                {/* <PermissionsGate scopes={[scopes.USER_ADD]}> */}
                <Item
                  title="Thêm trợ lý"
                  to="/admin/add-assistant"
                  icon={<PersonAddAltIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                {/* </PermissionsGate> */}
                {/* <PermissionsGate scopes={[scopes.USER_VIEW]}> */}
                <Item
                  title="Danh sách trợ lí"
                  to="/admin/manage-assistant"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                {/* </PermissionsGate> */}
                <PermissionsGate scopes={[scopes.USER_ADD]}>
                  <Divider />
                  <Item
                    title="Thêm bác sĩ"
                    to="/admin/add-user"
                    icon={<PersonAddAltIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.USER_VIEW]}>
                  <Item
                    title="Danh sách bác sĩ"
                    to="/admin/manage-user"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.USER_SCHEDULE_ACCESS]}>
                  <Divider />
                  <PermissionsGate scopes={[scopes.USER_SCHEDULE_ADD]}>
                    <Item
                      title="Thêm lịch khám"
                      to="/admin/add-user-schedule"
                      icon={<AddCircleOutlineOutlinedIcon />}
                      selected={selected}
                      isCollapsed={isCollapsed}
                      setSelected={setSelected}
                    />
                  </PermissionsGate>
                  <Item
                    title="Lịch khám bác sĩ"
                    to="/admin/manage-user-schedule"
                    icon={<PendingActionsIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
              </SubMenu>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.CLINIC_ACCESS]}>
              <SubMenu
                title={isCollapsed ? "" : "Phòng khám"}
                icon={<HomeWorkOutlinedIcon />}
              >
                <PermissionsGate scopes={[scopes.CLINIC_ADD]}>
                  <Item
                    title="Thêm phòng khám"
                    to="/admin/add-clinic"
                    icon={<AddHomeOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.CLINIC_VIEW]}>
                  <Item
                    title="Danh sách phòng khám"
                    to="/admin/manage-clinic"
                    icon={<BallotOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <Divider />
                <PermissionsGate scopes={[scopes.PACKET_ADD]}>
                  <Item
                    title="Thêm gói khám"
                    to="/admin/add-packet"
                    icon={<PlaylistAddCircleOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.PACKET_VIEW]}>
                  <Item
                    title="Danh sách gói khám"
                    to="/admin/manage-packet"
                    icon={<MenuOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.PACKET_SCHEDULE_ACCESS]}>
                  <PermissionsGate scopes={[scopes.PACKET_SCHEDULE_ADD]}>
                    <Divider />
                    <Item
                      title="Thêm lịch gói khám"
                      to="/admin/add-packet-schedule"
                      icon={<AddCircleOutlineOutlinedIcon />}
                      selected={selected}
                      isCollapsed={isCollapsed}
                      setSelected={setSelected}
                    />
                  </PermissionsGate>
                  <Item
                    title="Lịch khám các gói"
                    to="/admin/manage-packet-schedule"
                    icon={<PendingActionsIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
              </SubMenu>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.SPECIALTY_ACCESS]}>
              <SubMenu
                title={isCollapsed ? "" : "Chuyên khoa"}
                icon={<VaccinesOutlinedIcon />}
              >
                <PermissionsGate scopes={[scopes.SPECIALTY_ADD]}>
                  <Item
                    title="Thêm chuyên khoa"
                    to="/admin/add-specialty"
                    icon={<AddCircleOutlineOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.SPECIALTY_VIEW]}>
                  <Item
                    title="Danh sách chuyên khoa"
                    to="/admin/manage-specialty"
                    icon={<ListAltOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
              </SubMenu>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.HANDBOOK_ACCESS]}>
              <SubMenu
                title={isCollapsed ? "" : "Cẩm nang"}
                icon={<BookmarksOutlinedIcon />}
              >
                <PermissionsGate scopes={[scopes.HANDBOOK_ADD]}>
                  <Item
                    title="Thêm cẩm nang"
                    to="/admin/add-handbook"
                    icon={<BookmarkAddOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
                <PermissionsGate scopes={[scopes.HANDBOOK_VIEW]}>
                  <Item
                    title="Danh sách cẩm nang"
                    to="/admin/manage-handbook"
                    icon={<CollectionsBookmarkOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                </PermissionsGate>
              </SubMenu>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.CODE_ACCESS]}>
              <SubMenu
                title={isCollapsed ? "" : "Tác vụ"}
                icon={<AppRegistrationIcon />}
              >
                {(userInfo.roleId === "R1" || userInfo.roleId === "R0") && (
                  <Item
                    title="Cấp quyền"
                    to="/admin/manage-role"
                    icon={<ManageAccountsOutlinedIcon />}
                    selected={selected}
                    isCollapsed={isCollapsed}
                    setSelected={setSelected}
                  />
                )}

                <Item
                  title="Giá dịch vụ"
                  to="/admin/manage-code-price"
                  icon={<AttachMoneyIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                <Item
                  title="Phương thức"
                  to="/admin/manage-code-payment"
                  icon={<CreditCardIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                {/* <Item
                  title="Thành phố"
                  to="/admin/manage-code-province"
                  icon={<ApartmentOutlinedIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                /> */}
                <Item
                  title="Thời gian"
                  to="/admin/manage-code-time"
                  icon={<AccessAlarmIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                <Item
                  title="Chuyên khoa"
                  to="/admin/manage-code-specialty"
                  icon={<EarbudsIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
                <Item
                  title="Gói khám"
                  to="/admin/manage-code-packet"
                  icon={<LocalMallIcon />}
                  selected={selected}
                  isCollapsed={isCollapsed}
                  setSelected={setSelected}
                />
              </SubMenu>
            </PermissionsGate>

            {userInfo.roleId === "R2" && (
              <Item
                title="Cấp quyền trợ lý"
                to="/admin/manage-role-assistant"
                icon={<ManageAccountsOutlinedIcon />}
                selected={selected}
                isCollapsed={isCollapsed}
                setSelected={setSelected}
              />
            )}
            <LogOut
              title="Thoát"
              to="/system-login"
              icon={<LogoutIcon />}
              isCollapsed={isCollapsed}
              processLogout={processLogout}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    language: state.app.language,
    menuOpen: state.app.menuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changLanguageApp(language)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
