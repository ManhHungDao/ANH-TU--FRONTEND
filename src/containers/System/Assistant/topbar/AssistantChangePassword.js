import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Card, CardContent, TextField, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { changePassword } from "../../../../services/assistantService.js";
import ButtonComponent from "../../../../components/ButtonComponent";
import Header from "../../../../components/Header.jsx";

const AssistantChangePassword = ({ userInfo }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const checkValidate = () => {
    let errors = {};
    if (!oldPassword) errors.oldPassword = "Mật khẩu cũ không được bỏ trống";
    if (!newPassword) errors.newPassword = "Mật khẩu mới không được bỏ trống";
    if (!confirmPassword)
      errors.confirmPassword = "Xác nhận mật khẩu không được bỏ trống";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  const handleChangePassword = async () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Xác nhận mật khẩu sai");
      return;
    }
    if (newPassword.length < 8) {
      toast.warning("Mật khẩu ít nhất 8 ký tự");
      return;
    }
    const data = {
      email: userInfo.email ? userInfo.email : null,
      oldPassword,
      newPassword,
    };
    try {
      const res = await changePassword(data);
      if (res && res.success) {
        toast.success("Thay đổi mật khẩu thành công");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrors({});
      } else {
        toast.error("Thay đổi mật khẩu thất bại");
      }
    } catch (error) {
      toast.error(error.response.data.errMessage);
    }
  };
  return (
    <>
      <Box m="20px">
        <Header title="Đổi mật khẩu" />
        <Grid container display="flex" justifyContent={"center"}>
          <Card>
            <CardContent>
              <Box
                component="form"
                noValidate={false}
                // onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  label="Mật khẩu cũ"
                  autoFocus
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  error={errors.oldPassword ? true : false}
                  helperText={errors.oldPassword}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Mật khẩu mới"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={errors.newPassword ? true : false}
                  helperText={errors.newPassword}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword ? true : false}
                  helperText={errors.confirmPassword}
                />
                <div className="d-flex justify-content-end">
                  <ButtonComponent
                    content="Đổi mật khẩu"
                    handleClick={handleChangePassword}
                    bgcolor="#94e2cd"
                    color="#141414"
                    hoverBgColor="#1e5245"
                    hoverColor="#fff"
                  />
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssistantChangePassword);
