import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import InputSelect from "../../../components/Input/InputSelect";
import {
  Box,
  OutlinedInput,
  FormControl,
  Grid,
  Autocomplete,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  CardContent,
  Card,
  CardHeader,
} from "@mui/material";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { roles } from "../../../utils";
import ButtonComponent from "../../../components/ButtonComponent";
import { toast } from "react-toastify";
import ListComponent from "./List";

const typeMember = [
  { value: "R2", name: "Manager" },
  { value: "R4", name: "Assistant" },
];
const ManageRole = ({
  listManagers,
  getAllManagerAction,
  upsertRoleUserAction,
  clearStatus,
  isSuccess,
  userPermissions,
  getRoleUserAction,
  listAssistant,
  getAllAssistantAction,
}) => {
  const [data, setData] = useState([]);
  const [userGroup, setUserGroup] = useState("");
  const [user, setUser] = useState(null);
  const [assistant, setAssistant] = useState(null);
  const [openPatient, setOpenPatient] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openCLinic, setOpenCLinic] = useState(false);
  const [openSpecialty, setOpenSpecialty] = useState(false);
  const [openHandbook, setOpenHandbook] = useState(false);
  const [openCode, setOpenCode] = useState(false);
  const [openAssistant, setOpenAssistant] = useState(false);
  const [checkedPatient, setCheckedPatient] = useState([]);
  const [checkedUser, setCheckedUser] = useState([]);
  const [checkedAssistant, setCheckedAssistant] = useState([]);
  const [checkedClinic, setCheckedClinic] = useState([]);
  const [checkedSpecialty, setCheckedSpecialty] = useState([]);
  const [checkedHandbook, setCheckedHandbook] = useState([]);
  const [checkedCode, setCheckedCode] = useState([]);

  const resetState = () => {
    setCheckedPatient([]);
    setCheckedUser([]);
    setCheckedAssistant([]);
    setCheckedClinic([]);
    setCheckedSpecialty([]);
    setCheckedHandbook([]);
    setCheckedCode([]);
    setOpenPatient(false);
    setOpenUser(false);
    setOpenCLinic(false);
    setOpenSpecialty(false);
    setOpenHandbook(false);
    setOpenCode(false);
    setOpenAssistant(false);
  };

  useEffect(() => {
    if (!userGroup) return;
    setUser(null);
    setAssistant(null);
    resetState();
    if (userGroup === "R4") {
      getAllAssistantAction({
        page: 1,
        size: 999,
        filter: "",
      });
    } else getAllManagerAction();
  }, [userGroup]);

  useEffect(() => {
    if (isSuccess === true) {
      setUserGroup("");
      setUser(null);
      setAssistant(null);
      setData([]);
      resetState();
    }
    clearStatus();
  }, [isSuccess]);

  useEffect(() => {
    if (!userGroup) return;

    if (listManagers.length > 0)
      setData(
        listManagers.map((e) => ({
          id: e._id,
          name: e.name,
        }))
      );
  }, [listManagers]);

  useEffect(() => {
    if (!userGroup) return;
    if (listAssistant.list.length > 0)
      setData(
        listAssistant.list.map((e) => ({
          id: e._id,
          name: e.name,
        }))
      );
  }, [listAssistant]);

  useEffect(() => {
    resetState();
    if (user !== null) {
      getRoleUserAction(user.id);
    }
  }, [user]);

  useEffect(() => {
    resetState();
    if (assistant !== null) {
      getRoleUserAction(assistant.id);
    }
  }, [assistant]);

  useEffect(() => {
    if (!userPermissions) return;
    if (userGroup === "R4") {
      setCheckedAssistant(
        userPermissions.filter((e) => e.includes("assistant"))
      );
    } else if (userPermissions.length > 0) {
      setCheckedPatient(userPermissions.filter((e) => e.includes("patient")));
      setCheckedUser(userPermissions.filter((e) => e.includes("user")));
      setCheckedClinic(
        userPermissions.filter(
          (e) => e.includes("clinic") || e.includes("packet")
        )
      );
      setCheckedSpecialty(
        userPermissions.filter((e) => e.includes("specialty"))
      );
      setCheckedHandbook(userPermissions.filter((e) => e.includes("handbook")));
      setCheckedCode(userPermissions.filter((e) => e.includes("code")));
    }
  }, [userPermissions]);

  const handleToggle = (value, name) => () => {
    if (name === "patient") {
      const currentIndex = checkedPatient.indexOf(value);
      const newChecked = [...checkedPatient];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedPatient(newChecked);
    } else if (name === "user") {
      const currentIndex = checkedUser.indexOf(value);
      const newChecked = [...checkedUser];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedUser(newChecked);
    } else if (name === "clinic") {
      const currentIndex = checkedClinic.indexOf(value);
      const newChecked = [...checkedClinic];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedClinic(newChecked);
    } else if (name === "specialty") {
      const currentIndex = checkedSpecialty.indexOf(value);
      const newChecked = [...checkedSpecialty];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedSpecialty(newChecked);
    } else if (name === "handbook") {
      const currentIndex = checkedHandbook.indexOf(value);
      const newChecked = [...checkedHandbook];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedHandbook(newChecked);
    } else if (name === "code") {
      const currentIndex = checkedCode.indexOf(value);
      const newChecked = [...checkedCode];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedCode(newChecked);
    } else if (name === "assistant") {
      const currentIndex = checkedAssistant.indexOf(value);
      const newChecked = [...checkedAssistant];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setCheckedAssistant(newChecked);
    }
  };

  const handleSave = () => {
    if (!user && !assistant) {
      toast.error("Chưa chọn người dùng");
      return;
    }
    const permissions = [
      ...checkedPatient,
      ...checkedUser,
      ...checkedClinic,
      ...checkedSpecialty,
      ...checkedHandbook,
      ...checkedCode,
      ...checkedAssistant,
    ];
    upsertRoleUserAction({
      userId: userGroup === "R4" ? assistant.id : user.id,
      permissions,
    });
  };

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.name,
  };

  return (
    <>
      <Box m="20px">
        <Header title="Phân quyền người dùng" />
        <Grid container spacing={2}>
          <Grid item xs={4} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Nhóm tài khoản
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userGroup}
                onChange={(e) => setUserGroup(e.target.value)}
                input={<OutlinedInput label="Nhóm tài khoản" />}
              >
                {typeMember.map((e) => (
                  <MenuItem key={e.value} value={e.value}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} md={2}>
            {userGroup === "R4" ? (
              <>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    setAssistant(newValue);
                  }}
                  value={assistant}
                  {...defaultProps}
                  renderInput={(params) => (
                    <TextField {...params} label="Người dùng" />
                  )}
                />
              </>
            ) : (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event, newValue) => {
                  setUser(newValue);
                }}
                value={user}
                {...defaultProps}
                renderInput={(params) => (
                  <TextField {...params} label="Người dùng" />
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} md={12} xl={4}>
            <Card>
              <CardHeader title="Cấp quyền" />
              <CardContent
                sx={{
                  maxHeight: 650,
                  overflow: "auto",
                }}
              >
                {userGroup === "R4" ? (
                  <>
                    <ListComponent
                      setOpen={setOpenAssistant}
                      open={openAssistant}
                      icon={<PermIdentityOutlinedIcon />}
                      list={roles.assistant}
                      handleToggle={handleToggle}
                      toggleName="assistant"
                      checked={checkedAssistant}
                      primaryName="Bác sĩ"
                    />
                  </>
                ) : (
                  <>
                    <ListComponent
                      setOpen={setOpenPatient}
                      open={openPatient}
                      icon={<AccountBoxOutlinedIcon />}
                      list={roles.patient}
                      handleToggle={handleToggle}
                      toggleName="patient"
                      checked={checkedPatient}
                      primaryName="Người dùng"
                    />
                    {/* bác sĩ */}
                    <ListComponent
                      setOpen={setOpenUser}
                      open={openUser}
                      icon={<PermIdentityOutlinedIcon />}
                      list={roles.user}
                      handleToggle={handleToggle}
                      toggleName="user"
                      checked={checkedUser}
                      primaryName="Bác sĩ"
                    />
                    {/* phòng khám */}
                    <ListComponent
                      setOpen={setOpenCLinic}
                      open={openCLinic}
                      icon={<HomeWorkOutlinedIcon />}
                      list={roles.clinic}
                      handleToggle={handleToggle}
                      toggleName="clinic"
                      checked={checkedClinic}
                      primaryName="Phòng khám"
                    />
                    {/* chuyên khoa */}
                    <ListComponent
                      setOpen={setOpenSpecialty}
                      open={openSpecialty}
                      icon={<VaccinesOutlinedIcon />}
                      list={roles.specialty}
                      handleToggle={handleToggle}
                      toggleName="specialty"
                      checked={checkedSpecialty}
                      primaryName="Chuyên khoa"
                    />
                    {/* cẩm nang */}
                    <ListComponent
                      setOpen={setOpenHandbook}
                      open={openHandbook}
                      icon={<BookmarksOutlinedIcon />}
                      list={roles.handbook}
                      handleToggle={handleToggle}
                      toggleName="handbook"
                      checked={checkedHandbook}
                      primaryName="Cẩm nang"
                    />
                    {/* tác vụ */}
                    <ListComponent
                      setOpen={setOpenCode}
                      open={openCode}
                      icon={<AppRegistrationIcon />}
                      list={roles.code}
                      handleToggle={handleToggle}
                      toggleName="code"
                      checked={checkedCode}
                      primaryName="Tác vụ"
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} display="flex" justifyContent="flex-end">
            <ButtonComponent
              content="Lưu"
              handleClick={handleSave}
              bgcolor="#94e2cd"
              color="#141414"
              hoverBgColor="#1e5245"
              hoverColor="#fff"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listManagers: state.admin.listManagers,
    userPermissions: state.admin.userPermissions,
    isSuccess: state.app.isSuccess,
    listAssistant: state.admin.assistants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAssistantAction: (data) =>
      dispatch(actions.getAllAssistantAction(data)),
    getAllManagerAction: () => dispatch(actions.getAllManagerAction()),
    upsertRoleUserAction: (data) =>
      dispatch(actions.upsertRoleUserAction(data)),
    getRoleUserAction: (id) => dispatch(actions.getRoleUserAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRole);
