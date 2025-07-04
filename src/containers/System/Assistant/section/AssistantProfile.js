import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputSelect from "../../../../components/Input/InputSelect";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import AutocompleteAddress from "../../../../components/Input/AutocompleteAddress";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";
import { useEffect, useState } from "react";

const CONST_GENDER = [
  { id: "M", name: "Nam" },
  { id: "F", name: "Nữ" },
];
export const AssistantProfile = ({
  email,
  setEmail,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  gender,
  setGender,
  date,
  setDate,
  clinic,
  setClinic,
  specialty,
  setSpecialty,
  doctor,
  setDoctor,
  listClinicSelect,
  errors,
  listSpecialty,
  listDoctorSelect,
}) => {
  return (
    <Card>
      <CardHeader title="Thông tin chi tiết" />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ m: -1.5 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                error={errors?.email ? true : false}
                helperText={errors.email}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Tên"
                name="name"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                error={errors?.name ? true : false}
                helperText={errors.name}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <InputSelect
                label="Giới tính"
                value={gender}
                onChange={setGender}
                data={CONST_GENDER}
                isError={errors?.gender ? true : false}
                errorText={errors?.gender ? errors.gender : ""}
                name="Giới tính"
              />
            </Grid>
            <Grid xs={12} md={4}>
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
            <Grid xs={12} md={4}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                required
                value={phone}
                error={errors?.phone ? true : false}
                helperText={errors.phone}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Grid>
            <Grid xs={12} md={12}>
              <AutocompleteAddress
                isErr={errors?.address ? true : false}
                errName={errors?.address ? errors?.address : ""}
                setAddress={setAddress}
                address={address}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <InputSelect
                label="Chọn phòng khám"
                value={clinic}
                onChange={setClinic}
                data={listClinicSelect}
                isError={errors?.clinic ? true : false}
                errorText={errors?.clinic ? errors.clinic : ""}
                name="Chọn phòng khám"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <InputSelect
                label="Chọn chuyên khoa"
                value={specialty}
                onChange={setSpecialty}
                data={listSpecialty}
                isError={errors?.specialty ? true : false}
                errorText={errors?.specialty ? errors.specialty : ""}
                name="Chọn chuyên khoa"
              />
            </Grid>
            <Grid xs={12} md={6}>
              <InputSelect
                label="Chọn bác sĩ"
                value={doctor}
                onChange={setDoctor}
                data={listDoctorSelect}
                isError={errors?.doctor ? true : false}
                errorText={errors?.doctor ? errors.doctor : ""}
                name="Chọn bác sĩ"
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
