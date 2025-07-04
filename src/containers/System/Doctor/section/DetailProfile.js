import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  CardHeader,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import CKEditorFieldBasic from "../../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../../components/ButtonComponent";
import RecentMedicalHistory from "./RecentMedicalHistory";
import { useEffect } from "react";
import { scopes } from "../../../../utils";
import PermissionsGate from "../../../../hoc/PermissionsGate";
const CONST_GENDER = [
  { id: "M", name: "Nam" },
  { id: "F", name: "Nữ" },
];

export const PatientProfile = ({ patient }) => {
  return (
    <Card>
      <CardHeader title="Thông tin bệnh nhân" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Bệnh nhân:&nbsp;
              {patient?.name ? patient.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Email:&nbsp;
              {patient?.email ? patient.email : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Số điện thoại:&nbsp;
              {patient?.phone ? patient.phone : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giới tính:&nbsp;
              {CONST_GENDER.map((e) => {
                if (e.id === patient?.gender) return e.name;
              })}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ngày sinh:&nbsp;
              {patient?.dayOfBirth ? patient.dayOfBirth : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Mã số bảo hiểm:&nbsp;
              {patient?.insurance ? patient.insurance : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Lý do khám:&nbsp;
              {patient?.reason ? patient.reason : ""}
            </Typography>
            {patient?.name && (
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                display="flex"
                justifyContent="flex-end"
              >
                <RecentMedicalHistory
                  email={patient?.email ? patient.email : ""}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const DoctorProfile = ({ doctor }) => {
  const { detail, clinic, specialty } = doctor;
  return (
    <Card>
      <CardHeader title="Thông tin bác sĩ" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên bác sĩ:&nbsp;
              {doctor?.name ? doctor.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Cơ sở:&nbsp;
              {clinic?.name ? clinic.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Chuyên khoa:&nbsp;
              {specialty?.name ? specialty.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giá khám:&nbsp;
              {detail?.price?.name ? detail.price.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Phương thức thanh toán:&nbsp;
              {detail?.payment?.name ? detail.payment.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ghi chú:&nbsp;{detail?.note ? detail.note : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const PacketProfile = ({ packet }) => {
  const { detail, clinic, specialty } = packet;
  return (
    <Card>
      <CardHeader title="Thông tin gói khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên gói khám:&nbsp;
              {packet?.name ? packet.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Cơ sở:&nbsp;
              {clinic?.name ? clinic.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Chuyên khoa:&nbsp;
              {specialty?.name ? specialty.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giá khám:&nbsp;
              {detail?.price?.name ? detail.price.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Phương thức thanh toán:&nbsp;
              {detail?.payment?.name ? detail.payment.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ghi chú:&nbsp;
              {detail?.note ? detail.note : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const ScheduleProfile = ({
  time,
  status,
  setStatus,
  handleSave,
  isDisable,
  isFuture,
  hasUser,
}) => {
  let statusList = [];
  if (hasUser === false) statusList = ["Lịch hẹn mới"];
  // else if (isFuture && hasUser === false) {
  //   statusList = ["Lịch hẹn mới"];
  // }
  else if (isFuture && hasUser === true) {
    statusList = ["Chờ xác nhận", "Đã xác nhận", "Đã hủy"];
  } else if (hasUser === true) {
    statusList = [
      "Chờ xác nhận",
      "Đã xác nhận",
      "Đang khám",
      "Hoàn thành",
      "Đã hủy",
    ];
  }
  // const statusList = isFuture
  //   ? ["Lịch hẹn mới", "Chờ xác nhận", "Đã hủy"]
  //   : [
  //       "Lịch hẹn mới",
  //       "Chờ xác nhận",
  //       "Đã xác nhận",
  //       "Đang khám",
  //       "Hoàn thành",
  //       "Đã hủy",
  //     ];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <Card>
      <CardHeader title="Thông tin lịch khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography gutterBottom variant="subtitle1">
              Thời gian:&nbsp;{time}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                fullWidth
                disabled={
                  status === "Đã hủy" ||
                  status === "Hoàn thành" ||
                  isDisable === true
                }
              >
                <InputLabel id="demo-simple-select-label">
                  Trạng trái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={handleChange}
                  input={<OutlinedInput label="Trạng trái" />}
                >
                  {statusList.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
          >
            <ButtonComponent
              disabled={status === "Đã hủy" || status === "Hoàn thành"}
              content="Lưu"
              handleClick={handleSave}
              bgcolor="#94e2cd"
              color="#141414"
              hoverBgColor="#1e5245"
              hoverColor="#fff"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export const ResponseDetail = ({
  content,
  setContent,
  handleSave,
  title,
  setTitle,
  errors,
  checkRole,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(content);
  }, [content]);

  const titleList = ["Kết quả khám", "Đơn thuốc"];
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTitle(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangedValue = (data) => {
    setContent(data);
  };
  return (
    <Card>
      <CardHeader title="Thông tin phản hồi" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth error={errors?.title ? true : false}>
                <InputLabel id="demo-simple-select-error-label">
                  Loại tiêu đề
                </InputLabel>
                <Select
                  labelId="demo-simple-select-error-label"
                  id="demo-simple-select-error"
                  value={title}
                  onChange={handleChange}
                  input={<OutlinedInput label="Loại tiêu đề" />}
                >
                  {titleList.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors?.title ? errors.title : ""}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <CKEditorFieldBasic
              title="Chi tiết phản hồi"
              value={value}
              onChange={handleChangedValue}
              isError={errors.content ? true : false}
              errorText={errors.content}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
          >
            {checkRole === true ? (
              <PermissionsGate scopes={[scopes.ASSISTANT_SCHEDULE_RESULT]}>
                <ButtonComponent
                  content="Gửi"
                  handleClick={handleSave}
                  bgcolor="#94e2cd"
                  color="#141414"
                  hoverBgColor="#1e5245"
                  hoverColor="#fff"
                />
              </PermissionsGate>
            ) : (
              <ButtonComponent
                content="Gửi"
                handleClick={handleSave}
                bgcolor="#94e2cd"
                color="#141414"
                hoverBgColor="#1e5245"
                hoverColor="#fff"
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
