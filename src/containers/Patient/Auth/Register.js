import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../assets/logo.png";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import {
  FormControl,
  Stepper,
  Step,
  FormControlLabel,
  CardMedia,
  FormGroup,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import StepLabel from "@mui/material/StepLabel";
import successImg from "../../../assets/verified.png";
import validator from "validator";
import { toast } from "react-toastify";
import { emailRegister } from "../../../data/emailRegister";
import { useEffect } from "react";
import { sentMail, registerAccount } from "../../../services/patientService";
import Policie from "./Policie";

const steps = ["Điền thông tin", "Xác nhận email", "Hoàn thành"];

function PatientRegister({ loadingToggleAction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ detail: "", province: "" });
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [gender, setGender] = useState("M");
  const [date, setDate] = useState(dayjs(new Date()));
  const [name, setName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

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
  const generateRandomString = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const length = 8;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setCode(result);
  };

  useEffect(() => {
    generateRandomString();
  }, []);
  const handleNextStepOne = () => {
    if (
      !name ||
      !email ||
      !address.detail ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      toast.warning("Bạn cần điền đầy đủ thông tin");
      return;
    }
    if (!validator.isMobilePhone(phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.warning("Email không hợp lệ");
      return;
    }
    if (password.length < 8) {
      toast.warning("Mật khẩu ít nhất 8 tí tự");
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Xác nhận mật khẩu chưa chính xác");
      return;
    }
    if (checked === false) {
      toast.warning("Vui lòng đọc và xác nhận điều khoản");
      return;
    }
    // gửi email chứa mã xác nhận
    const emailHTML = emailRegister(code, name, email);
    const mail = {
      to: email,
      subject: "Mã xác nhận tạo tài khoản",
      html: emailHTML,
    };
    sendMail(mail);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNext = async () => {
    try {
      loadingToggleAction(true);
      if (code === confirmCode) {
        let res = await registerAccount({
          name,
          email,
          password,
          address: {
            province: address.province ? address.province : null,
            detail: address.detail ? address.detail : null,
            lat: coordinates.lat,
            lng: coordinates.lng,
          },
          gender,
          phone,
          dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
          insurance,
        });
        if (res && res.success) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          loadingToggleAction(false);
        } else {
          toast.error("Tạo tài khoản thất bại!");
          loadingToggleAction(false);
        }
      } else {
        loadingToggleAction(false);
        toast.warning("Mã xác nhận chưa đúng");
      }
    } catch (error) {
      if (error.response.data.error.code === 11000)
        toast.error("Email đã tồn tại");
      else toast.error("Tạo tài khoản thất bại!");
      loadingToggleAction(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
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
              Đăng Kí
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
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Tên"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Số điện thoại"
                        fullWidth
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="vi"
                      >
                        <DatePicker
                          disableFuture
                          label="Ngày sinh"
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={date}
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Giới tính
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          label="Giới tính"
                          fullWidth
                        >
                          <MenuItem value={"M"}>Nam</MenuItem>
                          <MenuItem value={"F"}>Nữ</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <AutocompleteAddress
                        setAddress={setAddress}
                        setCoordinates={setCoordinates}
                        address={address}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        required
                        fullWidth
                        label="Xác nhận mật khẩu"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        label="Mã số bảo hiểm"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  {/* <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Tôi đồng ý với mọi điều khoản được đưa ra."
                    />
                  </FormGroup> */}
                  <Typography
                    color={"primary"}
                    sx={{ cursor: "pointer", pt: 2 }}
                    onClick={() => setOpen(true)}
                  >
                    Đọc điều khoản
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleNextStepOne}
                  >
                    Tiếp Tục
                  </Button>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <TextField
                    required
                    fullWidth
                    label="Mã xác nhận email"
                    type="text"
                    value={confirmCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                  />
                  <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                    <Grid item xs={4} sm={4} md={4}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleBack}
                      >
                        Quay lại
                      </Button>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleNext}
                      >
                        Xác nhận
                      </Button>
                    </Grid>
                  </Grid>
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
                    <Typography variant="h5">
                      TẠO TÀI KHOẢN THÀNH CÔNG
                    </Typography>
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
      {open && (
        <Policie
          open={open}
          setOpen={setOpen}
          checked={checked}
          setChecked={setChecked}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientRegister);
