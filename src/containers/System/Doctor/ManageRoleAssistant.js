import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  CardContent,
  Card,
  CardHeader,
} from "@mui/material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { roles } from "../../../utils";
import ButtonComponent from "../../../components/ButtonComponent";
import { toast } from "react-toastify";
import ListComponent from "../Allcode/List";
import { getAssistantsUnderDoctor } from "../../../services/assistantService";

const ManageRoleAssistant = ({
  upsertRoleUserAction,
  clearStatus,
  isSuccess,
  userPermissions,
  getRoleUserAction,
  userInfo,
}) => {
  const [data, setData] = useState([]);
  const [assistant, setAssistant] = useState(null);
  const [openAssistant, setOpenAssistant] = useState(false);

  const [checkedAssistant, setCheckedAssistant] = useState([]);

  const resetState = () => {
    setCheckedAssistant([]);
    setOpenAssistant(false);
  };

  const getListAssistant = async () => {
    try {
      if (!userInfo) return;
      const id = userInfo._id || userInfo.id;
      const res = await getAssistantsUnderDoctor(id);
      if (res && res.success) {
        setData(
          res.assistants.map((e) => ({
            name: e.name,
            id: e._id || e.id,
          }))
        );
      } else {
        toast.error("Lấy danh sách không thành công");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  useEffect(() => {
    getListAssistant();
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      setAssistant(null);
      resetState();
      getListAssistant();
    }
    clearStatus();
  }, [isSuccess]);

  useEffect(() => {
    resetState();
    if (assistant !== null) {
      getRoleUserAction(assistant.id);
    }
  }, [assistant]);

  useEffect(() => {
    if (!userPermissions) return;
    setCheckedAssistant(userPermissions.filter((e) => e.includes("assistant")));
  }, [userPermissions]);

  const handleToggle = (value, name) => () => {
    if (name === "assistant") {
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
    if (!assistant) {
      toast.error("Chưa chọn người dùng");
      return;
    }
    const permissions = [...checkedAssistant];
    upsertRoleUserAction({
      userId: assistant.id,
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
            <TextField
              disabled
              id="outlined-disabled"
              label="Nhóm tài khoản"
              defaultValue="Assistant"
            />
          </Grid>
          <Grid item xs={4} md={2}>
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
    userPermissions: state.admin.userPermissions,
    isSuccess: state.app.isSuccess,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertRoleUserAction: (data) =>
      dispatch(actions.upsertRoleUserAction(data)),
    getRoleUserAction: (id) => dispatch(actions.getRoleUserAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRoleAssistant);
