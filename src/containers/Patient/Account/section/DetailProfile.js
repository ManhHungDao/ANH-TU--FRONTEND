import React from "react";
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
  Button,
  TextField,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";
import "./style.scss";

export const PatientProfile = ({ data }) => {
  const user = data.schedule.user;
  return (
    <Card>
      <CardHeader title="Thông tin đặt lịch" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography gutterBottom variant="subtitle1">
              Tên:&nbsp;
              {user?.name ? user.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Email:&nbsp;
              {user?.email ? user.email : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Số điện thoại:&nbsp;
              {user?.phone ? user.phone : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giới tính:&nbsp;
              {user?.gender === "M" ? "Nam" : "Nữ"}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ngày sinh:&nbsp;
              {user?.dayOfBirth
                ? dayjs(new Date(user.dayOfBirth)).format("DD/MM/YYYY")
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Lý do khám:&nbsp;
              {user?.reason ? user.reason : ""}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const DetailExam = ({ data, enableFeeback }) => {
  const [doctor] = data.doctor;
  const [packet] = data.packet;

  let setLink = {
    date: data.date ? data.date : "",
    time: data.schedule.time ? data.schedule.time : "",
    packetId: data?.packet[0]?._id ? data.packet[0]._id : "",
    doctorId: data?.doctor[0]?._id ? data.doctor[0]._id : "",
  };

  let link = `http://localhost:3000/feedback?date=${setLink.date}&time=${setLink.time}&doctorId=${setLink.doctorId}&packetId=${setLink.packetId}`;

  return (
    <Card>
      <CardHeader title="Thông tin khám" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            {doctor?.name ? (
              <>
                <Typography gutterBottom variant="subtitle1">
                  Tên bác sĩ:&nbsp;
                  {doctor.name}
                </Typography>
              </>
            ) : (
              ""
            )}
            {packet?.name ? (
              <>
                <Typography gutterBottom variant="subtitle1">
                  Tên gói khám:&nbsp;
                  {packet.name}
                </Typography>
              </>
            ) : (
              ""
            )}
            <Typography gutterBottom variant="subtitle1">
              Cơ sở:&nbsp;
              {doctor
                ? doctor?.detail?.clinic?.name
                : packet?.clinic?.name
                ? packet?.clinic?.name
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Chuyên khoa:&nbsp;
              {doctor
                ? doctor?.detail?.specialty?.name
                : packet?.type?.specialty?.name
                ? packet?.type?.specialty?.name
                : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Giá khám:&nbsp;
              {data?.detail?.price?.name ? data.detail.price.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Phương thức thanh toán:&nbsp;
              {data?.detail?.payment?.name ? data.detail.payment.name : ""}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Ghi chú:&nbsp;
              {data?.detail?.note ? data?.detail?.note : ""}
            </Typography>
            <span className="d-flex justify-content-end">
              {enableFeeback && (
                <Button
                  variant="contained"
                  onClick={() => window.open(link, "_blank")}
                >
                  Đánh giá
                </Button>
              )}
            </span>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const ScheduleProfile = ({ time, status, handleSave }) => {
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

          {status === "Chờ xác nhận" ? (
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              display="flex"
              justifyContent="space-evenly"
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSave("Đã hủy")}
              >
                Hủy lịch
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSave("Đã xác nhận")}
              >
                Xác nhận khám
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                id="outlined-basic"
                label="Trạng thái"
                variant="outlined"
                value={status}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export const DetailPrescription = ({ detail }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Kết quả khám" />
            <CardContent className="render__prescrtiption">
              <span
                className="render__prescrtiption--detail"
                dangerouslySetInnerHTML={{ __html: detail.result }}
              ></span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Thông tin đơn thuốc" />
            <CardContent className="render__prescrtiption">
              <span
                className="render__prescrtiption--detail"
                dangerouslySetInnerHTML={{ __html: detail.detail }}
              ></span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
