import React, { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/Section/Header";
import { Container, Box, TextField, Grid, Button } from "@mui/material";
import Header from "../../../components/Header";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

const ChangePassword = ({
  changePasswordAccount,
  patientInfo,
  changPassSuccess,
  clearUserStatus,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (changPassSuccess === true) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      clearUserStatus();
    }
  }, [changPassSuccess]);

  const handleUpdate = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("Vui lòng không bỏ trống thông tin");
      return;
    }
    if (newPassword.length < 8) {
      toast.warning("Mật khẩu ít nhất 8 ký tự");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.warning("Xác nhận mật khẩu chưa chính xác");
      return;
    }
    const email = patientInfo?.email;
    changePasswordAccount(email, oldPassword, newPassword);
  };
  return (
    <>
      <HomeHeader />
      <Box
        sx={{
          p: 3,
          paddingTop: "85px",
          minHeight: `calc(100vh - 225px)`,
        }}
      >
        <Container>
          <Header title="đổi mật khẩu" />
          <Grid container display="flex" justifyContent={"center"}>
            <Box
              component="form"
              noValidate={false}
              // onSubmit={handleSubmit}
            >
              <TextField
                required
                fullWidth
                type="password"
                label="Mật khẩu cũ"
                autoFocus
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
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
              />
              <div className="d-flex justify-content-end mt-2">
                <Button
                  margin="normal"
                  variant="contained"
                  onClick={handleUpdate}
                >
                  Cập nhập
                </Button>
              </div>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    changPassSuccess: state.user.changPassSuccess,
    patientInfo: state.patient.patientInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changePasswordAccount: (email, oldPass, newPass) =>
      dispatch(actions.changePasswordAccountAction(email, oldPass, newPass)),
    clearUserStatus: () => dispatch(actions.clearUserStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
