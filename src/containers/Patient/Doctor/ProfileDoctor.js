import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Stack, Avatar, Typography, Grid } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import _ from "lodash";
import { getSingleUserService } from "../../../services/userService";
import { getSingleUserSchedule } from "../../../services/scheduleService";
import ScheduleTime from "../Schedule/ScheduleTime";
import DetailSchuleBooking from "../Schedule/DetailSchuleBooking";
import localization from "moment/locale/vi";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ProfileDoctor = ({ id, language, fetchAllcode, allcodes }) => {
  const [data, setData] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [date, setDate] = useState(
    moment(new Date()).add(1, "days").startOf("day").valueOf()
  );
  const [timeSchedule, setTimeSchedule] = useState([]);
  // tải lại lịch khám sau khi có người đặt
  const [reLoad, setReLoad] = useState(false);
  const navigate = useNavigate();

  const getDataSchedule = async () => {
    let res = await getSingleUserSchedule(id, date / 1000);
    if (res && res.success === true) {
      if (res?.schedule?.schedule && res.schedule.schedule.length > 0) {
        setTimeSchedule(
          res.schedule.schedule.filter(
            (e) => e.status === "Lịch hẹn mới" || e.status === "Đã hủy"
          )
        );
      }
      console.log("check detail", res?.schedule?.detail);
      setNote(res?.schedule?.detail?.note);
      setPrice(res?.schedule?.detail?.price);
      setPayment(res?.schedule?.detail?.payment);
    } else {
      setTimeSchedule([]);
      setPrice("");
      setNote("");
      setPayment("");
    }
  };

  useEffect(() => {
    fetchAllcode();
  }, []);

  useEffect(() => {
    if (reLoad === false) return;
    getDataSchedule();
    setReLoad(false);
  }, [reLoad]);

  useEffect(() => {
    getDataUser();
    getDataSchedule();
  }, [id]);

  useEffect(() => {
    const temp = moment(new Date()).add(1, "days").startOf("day").valueOf();
    if (date !== temp) getDataSchedule();
  }, [date]);
  // data user booking

  const getDataUser = async () => {
    let res = await getSingleUserService(id);
    if (res && res.success) {
      setData(res.user);
    } else {
      setData("");
    }
  };

  const dataToSchedule = {
    idDoctor: id,
    idPacket: null,
    nameData: data?.name,
    imgData: data?.image?.url,
    clinic: data?.detail?.clinic?.name,
    specialty: data?.detail?.specialty?.name,
  };
  return (
    <>
      <Box
        m="10px 0"
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          bgcolor: "transparent",
          borderRadius: 4,
        }}
      >
        <Stack display="flex" gap={1} direction="row">
          <Avatar
            alt={data?.name ? data.name : ""}
            src={data?.image?.url ? data.image.url : ""}
            sx={{ width: 100, height: 100, cursor: "pointer" }}
            onClick={() => navigate(`/detail-doctor/${id}`)}
          />
          <Stack display={"flex"} gap={1}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, cursor: "pointer" }}
              onClick={() => navigate(`/detail-doctor/${id}`)}
            >
              {data?.detail?.position?.name ? data.detail.position.name : ""}
              <span style={{ textTransform: "capitalize" }}>
                &nbsp; {data?.name ? data.name : ""}
              </span>
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: "0.7", maxWidth: 500 }}
            >
              {data?.detail?.introduce ? data.detail.introduce : ""}
            </Typography>
          </Stack>
        </Stack>
        {/* render time booking */}
        <Grid container spacing={2} display="flex" alignItems={"center"}>
          <Grid item sm={12} md={6}>
            <ScheduleTime
              data={dataToSchedule}
              price={price?.name}
              note={note}
              date={date}
              setDate={setDate}
              allcodes={allcodes}
              timeSchedule={timeSchedule}
              setReLoad={setReLoad}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <DetailSchuleBooking
              clinic={data?.detail?.clinic}
              price={price?.name}
              payment={payment?.name}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
