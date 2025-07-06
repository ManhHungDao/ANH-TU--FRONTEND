import React, { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/Section/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Header from "../../../components/Header";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";
import { toast } from "react-toastify";
import validator from "validator";
import { getInforAccount } from "../../../services/patientService";

const AccountInfo = ({
  patientInfo,
  updateInforAccount,
  loadingToggleAction,
}) => {
  const [email, setEmail] = useState("");
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

  const getDataAccount = async () => {
    try {
      loadingToggleAction(true);
      let res = await getInforAccount(patientInfo._id);
      if (res && res.success) {
        const patient = res.patient;
        setEmail(patient?.email);
        setPhone(patient?.phone);
        setGender(patient?.gender);
        setDate(patient?.dateOfBirth);
        setAddress({
          detail: patient?.address?.detail,
          province: patient?.address?.province,
        });
        setName(patient.name);
        setInsurance(patient.insurance);
        loadingToggleAction(false);
      }
      loadingToggleAction(false);
    } catch (error) {
      loadingToggleAction(false);
    }
  };

  useEffect(() => {
    getDataAccount();
  }, []);

  const handleUpdate = () => {
    if (!name || !address.detail || !phone) {
      toast.warning("Bạn cần điền đầy đủ thông tin");
      return;
    }
    if (!validator.isMobilePhone(phone)) {
      toast.warning("Số điện thoại không hợp lệ");
      return;
    }

    updateInforAccount(patientInfo._id, {
      email,
      name,
      gender,
      phone,
      address: {
        province: address.province ? address.province : null,
        detail: address.detail ? address.detail : null,
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
      dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
      insurance,
    });
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
          <Header title="Thông tin cá nhân" />
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
                disabled
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
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

            <Grid item xs={12} sm={4} md={4}>
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
            <Grid item xs={12} sm={4} md={4}>
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
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                fullWidth
                label="Mã số bảo hiểm"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <AutocompleteAddress
                setAddress={setAddress}
                address={address}
                setCoordinates={setCoordinates}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" onClick={handleUpdate}>
                Cập nhập
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    patientInfo: state.patient.patientInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateInforAccount: (id, data) =>
      dispatch(actions.updateInforAccountAction(id, data)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
