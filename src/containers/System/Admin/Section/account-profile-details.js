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
import "dayjs/locale/vi";
import AutocompleteAddress from "../../../../components/Input/AutocompleteAddress";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";
import { useEffect, useState } from "react";

const CONST_GENDER = [
  { id: "M", name: "Nam" },
  { id: "F", name: "Nữ" },
];

export const AccountProfileDetails = ({
  email,
  setEmail,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  dataSelect,
  gender,
  setGender,
  position,
  setPosition,
  date,
  setDate,
  errors,
}) => {
  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader title="Thông tin cá nhân" />
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
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={6}>
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
              <Grid xs={12} md={6}>
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
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={12}>
                <AutocompleteAddress
                  isErr={errors?.address ? true : false}
                  errName={errors?.address ? errors?.address : ""}
                  setAddress={setAddress}
                  address={address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export const AccountProfileClinic = ({
  clinic,
  setClinic,
  specialty,
  setSpecialty,
  price,
  setPrice,
  payment,
  setPayment,
  introduce,
  setIntroduce,
  note,
  setNote,
  content,
  setContent,
  dataSelect,
  listClinicSelect,
  errors,
  listSpecialty,
  idSpecialtyConstant,
}) => {
  useEffect(() => {
    if (listSpecialty.length === 0) setSpecialty("");
    if (listSpecialty && listSpecialty.length > 0) {
      const exist = listSpecialty
        .filter((e) => {
          return e.id === idSpecialtyConstant;
        })
        .shift();
      if (exist) {
        setSpecialty({
          value: exist.id ? exist.id : "",
          label: exist.name ? exist.name : "",
        });
      } else {
        setSpecialty("");
      }
    }
  }, [listSpecialty]);

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader title="Thông tin cơ quan" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={6}></Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Giới thiệu"
                  multiline
                  maxRows={20}
                  fullWidth
                  onChange={(e) => setIntroduce(e.target.value)}
                  error={errors?.introduce}
                  helperText={errors?.introduce}
                  value={introduce}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Ghi chú"
                  multiline
                  maxRows={4}
                  fullWidth
                  onChange={(e) => setNote(e.target.value)}
                  error={errors?.note}
                  helperText={errors?.note ? errors.note : ""}
                  value={note}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CKEditorFieldBasic
                  value={content}
                  onChange={setContent}
                  isError={errors.content ? true : false}
                  errorText={errors.content}
                  title="Chi tiết"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};
