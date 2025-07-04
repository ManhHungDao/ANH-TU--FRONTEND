import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import validator from "validator";
import { Box } from "@mui/material";
import Header from "../../../components/Header.jsx";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import ButtonComponent from "../../../components/ButtonComponent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputSelect from "../../../components/Input/InputSelect";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import _ from "lodash";
import "./style.scss";
import { getAllDoctorBySpecialtyOfClinicHome } from "../../../services/userService";
import { createNewAssistant } from "../../../services/assistantService";
import { toast } from "react-toastify";
const AddNewAssistant = ({
  getListClinicAction,
  listClinic,
  getSpecialtyByClinicIdAction,
  listSpecialtyInClinic,
  loadingToggleAction,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("123456Aa.");
  const [address, setAddress] = useState({ detail: "", province: "" });
  const [gender, setGender] = useState("M");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [showPassword, setShowPassword] = useState(false);
  const [doctor, setDoctor] = useState("");
  //information doctor's clinic
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [listClinicSelect, setListClinicSelect] = useState([]);
  const [listSpecialtySelect, setListSpecialtySelect] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getListClinicAction();
  }, []);

  useEffect(() => {
    setListClinicSelect(
      listClinic.map((e) => {
        return {
          id: e._id,
          name: e.name,
        };
      })
    );
  }, [listClinic]);

  useEffect(() => {
    setSpecialty("");
    setDoctor("");
    setListDoctor("");
    if (!_.isEmpty(clinic)) getSpecialtyByClinicIdAction(clinic.value);
  }, [clinic]);

  const fetchListDoctor = async (id) => {
    const data = {
      page: 1,
      size: 999,
      specialtyId: id,
      clinicId: clinic ? clinic?.value : "",
    };
    const res = await getAllDoctorBySpecialtyOfClinicHome(data);
    if (res && res.success) {
      setListDoctor(
        res?.users.map((i) => {
          return {
            id: i._id || i.id,
            name: i.name,
          };
        })
      );
    }
  };

  useEffect(() => {
    if (!specialty) return;
    fetchListDoctor(specialty.value);
  }, [specialty]);

  useEffect(() => {
    if (listSpecialtyInClinic && listSpecialtyInClinic.length > 0)
      setListSpecialtySelect(
        listSpecialtyInClinic.map((e) => ({ id: e.key, name: e.name }))
      );
    else setListSpecialtySelect([]);
  }, [listSpecialtyInClinic]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChangeRadio = (event) => {
    setGender(event.target.value);
  };
  const controlProps = (item) => ({
    checked: gender === item,
    onChange: handleChangeRadio,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const checkValidate = () => {
    let errors = {};
    if (!email) errors.email = "Email không được bỏ trống";
    if (!validator.isEmail(email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!password) errors.password = "Mật khẩu không được bỏ trống";
    if (!address.detail) errors.address = "Địa chỉ không được bỏ trống";
    if (!phone) errors.phone = "Số điện thoại không được bỏ trống";
    if (!validator.isMobilePhone(phone))
      errors.phone = "Số điện thoại không hợp lệ";

    if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    if (!specialty) errors.specialty = "Chưa chọn chuyên khoa";
    if (!doctor) errors.doctor = "Chưa chọn bác sĩ";
    if (!image) errors.image = "Chưa tải hình ảnh";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  const handleSave = async () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let data = {
      email,
      image,
      name,
      phone,
      password,
      gender,
      address,
      dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
      doctor: {
        id: doctor.value,
        name: doctor.label,
      },
    };
    try {
      loadingToggleAction(true);
      const res = await createNewAssistant(data);
      if (res && res.success) {
        setEmail("");
        setName("");
        setPhone("");
        setPassword("123456Aa.");
        setAddress({ detail: "", province: "" });
        setGender("M");
        setImage("");
        setDate(dayjs(new Date()));
        setClinic("");
        setSpecialty("");
        setListSpecialtySelect("");
        setDoctor("");
        setListDoctor("");
        setShowPassword(false);
        setPreviewImgUrl("");
        setErrors({});
        window.scrollTo({ top: 0, behavior: "smooth" });
        toast.success("Tạo trợ lý thành công");
        loadingToggleAction(false);
      } else {
        toast.error("Tạo trợ lý thất bại");
        loadingToggleAction(false);
      }
    } catch (error) {
      loadingToggleAction(false);
      if (error.response.data.error.code === 11000)
        toast.error("Email đã tồn tại");
    }
  };
  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Trợ Lý" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  value={email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Tên"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  value={name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="outlined-required"
                  label="Số điện thoại"
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone ? true : false}
                  helperText={errors.phone}
                  value={phone}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={password}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <AutocompleteAddress
                  isErr={errors.address ? true : false}
                  errName={errors.address}
                  setAddress={setAddress}
                  address={address}
                />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
                  Giới tính
                  <FormControl>
                    <div>
                      <Radio
                        {...controlProps("M")}
                        color="primary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                      />
                      Nam
                      <Radio
                        {...controlProps("F")}
                        color="primary"
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 24,
                          },
                        }}
                      />
                      Nữ
                    </div>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  label="Chọn phòng khám"
                  value={clinic}
                  onChange={setClinic}
                  data={listClinicSelect}
                  isError={errors.clinic ? true : false}
                  errorText={errors.clinic ? errors.clinic : ""}
                  name="Chọn phòng khám"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  label="Chọn chuyên khoa"
                  value={specialty}
                  onChange={setSpecialty}
                  data={listSpecialtySelect}
                  isError={errors.specialty ? true : false}
                  errorText={errors.specialty ? errors.specialty : ""}
                  name="Chọn chuyên khoa"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  label="Chọn bác sĩ"
                  value={doctor}
                  onChange={setDoctor}
                  data={listDoctor}
                  isError={errors.doctor ? true : false}
                  errorText={errors.doctor ? errors.doctor : ""}
                  name="Chọn bác sĩ"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <UpLoadAvatar
              setImg={setImage}
              content="Tải ảnh"
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              isError={errors.image ? true : false}
              errorText={errors.image}
            />
          </Grid>
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
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isSuccess: state.app.isSuccess,
    listClinic: state.client.listClinic,
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearStatus: () => dispatch(actions.clearStatus()),
    getListClinicAction: () =>
      dispatch(actions.getListClinicHomePatientAction()),
    getSpecialtyByClinicIdAction: (id) =>
      dispatch(actions.getSpecialtyByClinicIdAction(id)),
    loadingToggleAction: (id) => dispatch(actions.loadingToggleAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewAssistant);
