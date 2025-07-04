import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../assets/logo.png";
import { FormControl, Stepper, Step, CardMedia, Stack } from "@mui/material";
import { InputLabel, OutlinedInput, IconButton } from "@mui/material";
import StepLabel from "@mui/material/StepLabel";
import successImg from "../../../assets/verified.png";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { emailForgotPass } from "../../../data/emailForgotPass";
import {
  sentMail,
  checkEmailExisted,
  patientResetPassword,
} from "../../../services/patientService";

const steps = ["Xác nhận email", "Cập nhập mật khẩu", "Hoàn thành"];

const ForgotPassword = ({ loadingToggleAction }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const navigate = useNavigate();

  // const generateRandomString = async () => {
  //   try {
  //     const res = checkEmailExisted(email);
  //     if (res && res.existed === false) {
  //       toast.warning("Email không tồn tại");
  //       return;
  //     }
  //     const characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     let result = "";
  //     const length = 8;

  //     for (let i = 0; i < length; i++) {
  //       const randomIndex = Math.floor(Math.random() * characters.length);
  //       result += characters[randomIndex];
  //     }

  //     setCode(result);
  //   } catch (error) {
  //     toast.error("Đã có lỗi xảy ra");
  //   }
  // };

  // useEffect(() => {
  //   generateRandomString();
  // }, []);

  const handleNext = () => {
    if (code === confirmCode)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNextStep = async () => {
    try {
      if (password === confirmPassword) {
        if (password.length < 8) {
          toast.warning("Mật khẩu ít nhất 8 tí tự");
          return;
        }
        loadingToggleAction(true);
        let res = await patientResetPassword(email, password);
        if (res && res.success) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.error("Không thể cập nhập mật khẩu");
        }
        loadingToggleAction(false);
      } else {
        toast.warning("Xác nhận mật khẩu chưa đúng");
      }
    } catch (error) {
      loadingToggleAction(false);
      toast.error("Không thể cập nhập mật khẩu");
    }
  };

  const sendMail = async (mail) => {
    try {
      let res = await sentMail(mail);
      if (!res || res.success === false) {
        toast.warning("Gửi thư xác nhận thất bại");
      }
    } catch (error) {
      toast.warning("Gửi thư xác nhận thất bại");
    }
  };

  const handleGetCode = async () => {
    //
    const res = await checkEmailExisted(email);
    if (res.existed === false) {
      toast.warning("Email không tồn tại");
      return;
    } else if (!res) {
      toast.error("Đã xảy ra lỗi");
      return;
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 8;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    //
    setCode(result);
    setIsDisabled(true);
    const emailHTML = emailForgotPass(result);
    const mail = {
      to: email,
      subject: "Mã xác nhận quên mật khẩu",
      html: emailHTML,
    };
    sendMail(mail);
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        // sx={{ display: "grid", placeSelf: "center" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.primary" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Quên Mật Khẩu
          </Typography>
          <Box sx={{ width: "100%", my: 5 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Bạn đã hoàn thành tạo tài khoản
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                </Box>
              </React.Fragment>
            )}
          </Box>
          <Box sx={{ mt: 3, width: { xs: "90%", md: "80%" } }}>
            {activeStep === 0 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid
                      container
                      spacing={2}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Grid item xs={9} sm={9} md={9}>
                        <TextField
                          required
                          autoFocus
                          fullWidth
                          id="email"
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={3} sm={3} md={3}>
                        <Button
                          variant="contained"
                          onClick={handleGetCode}
                          disabled={isDisabled}
                        >
                          {isDisabled ? "Đã gửi" : "Gửi mã"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Mã xác nhận"
                      value={confirmCode}
                      onChange={(e) => setConfirmCode(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleNext}
                >
                  Tiếp Tục
                </Button>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormControl fullWidth required variant="outlined">
                        <InputLabel>Mật khẩu mới</InputLabel>
                        <OutlinedInput
                          type={showPassword ? "text" : "password"}
                          label="Mật khẩu mới"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormControl fullWidth required variant="outlined">
                      <InputLabel>Xác nhận mật khẩu</InputLabel>
                      <OutlinedInput
                        type="password"
                        label="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleNextStep}
                >
                  Tiếp Tục
                </Button>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <Typography variant="h5">ĐỔI MẬT KHẨU THÀNH CÔNG</Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      borderRadius: "50%",
                      width: 50,
                    }}
                    image={successImg}
                    alt={"image"}
                  />
                </Stack>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{ width: "fit-content" }}
                  >
                    Đăng Nhập
                  </Button>
                </Stack>
              </>
            )}
            <Stack sx={{ mt: 5 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 5, cursor: "pointer" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                HealthCare-
                {new Date().getFullYear()}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
