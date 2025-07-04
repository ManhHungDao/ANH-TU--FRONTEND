import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import _ from "lodash";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import ButtonComponent from "../../../components/ButtonComponent";
import { toast } from "react-toastify";

const tomorrow = dayjs().add(1, "day");

const AssistantManageSchedule = ({
  allcodes,
  fetchAllcode,
  isSuccess,
  clearStatus,
  upsertSchedule,
  getSingleUserSchedule,
  userSchedule,
  getSingleUser,
  user,
  assistantInfo,
}) => {
  const [dataUser, setDataUser] = useState({});
  const [date, setDate] = useState(
    dayjs(new Date(tomorrow).setHours(0, 0, 0)).format("D MMMM YYYY")
  );
  const [errors, setErrors] = useState({});
  const [timeSchedule, setTimeSchedule] = useState([]);

  useEffect(() => {
    fetchAllcode();
    getSingleUser(assistantInfo.doctor.id);
    getSingleUserSchedule(assistantInfo.doctor.id, dayjs(date).unix());
  }, []);

  // useEffect(() => {
  //   if (!_.isEmpty(doctorInfo)) return;

  // }, [doctorInfo]);

  useEffect(() => {
    if (!_.isEmpty(user)) setDataUser(user);
  }, [user]);

  useEffect(() => {
    if (isSuccess === true) {
      // setDate(
      //   dayjs(new Date(tomorrow).setHours(0, 0, 0)).format("D MMMM YYYY")
      // );
    }
    clearStatus();
  }, [isSuccess]);

  useEffect(() => {
    if (_.isEmpty(allcodes)) return;
    const list = allcodes
      .filter((e) => e.type === "TIME")
      .map((e) => ({
        id: e._id,
        name: e.valueVI,
        active: false,
      }));
    // khởi tạo list time khi chạy
    setTimeSchedule(list);

    const { schedule } = userSchedule;
    if (_.isEmpty(schedule)) return;
    const listTimeActive = list.map((e) => {
      schedule.map((item) => {
        if (item.time === e.id) {
          e.active = true;
        }
        return e;
      });
      return e;
    });
    setTimeSchedule(listTimeActive);
  }, [allcodes, userSchedule]);

  const handleChangeDate = (date) => {
    setTimeSchedule(
      allcodes
        .filter((e) => e.type === "TIME")
        .map((e) => ({
          id: e._id,
          name: e.valueVI,
          active: false,
        }))
    );
    setDate(dayjs(new Date(date).setHours(0, 0, 0)));
    getSingleUserSchedule(assistantInfo.doctor.id, dayjs(date).unix());
  };

  const checkValidate = () => {
    let errors = {};
    let activeTime = timeSchedule.filter((e) => e.active === true);
    // if (activeTime.length <= 0) errors.time = "Chưa chọn thời gian khám";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  const enableClick = (id) => {
    if (_.isEmpty(userSchedule)) return true;
    const { schedule } = userSchedule;
    const [existed] = schedule.filter((e) => e.time === id);

    if (existed)
      if (existed?.status !== "Đã hủy" && existed?.status !== "Lịch hẹn mới") {
        toast.error("Đã có bệnh nhân đặt lịch");
        return false;
      }

    return true;
  };

  const handleClickTime = (e) => {
    // kiểm tra nút khi chọn
    if (enableClick(e.id) === false) return;
    let copy = timeSchedule;
    copy = copy.map((item) => {
      if (item.id === e.id) {
        item.active = !item.active;
      }
      return item;
    });
    setTimeSchedule(copy);
  };
  const handleSave = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let listTime = timeSchedule
      .filter((e) => e.active === true)
      .map((e) => ({ time: e.id }));
    const { schedule } = userSchedule;
    listTime = listTime.map((e) => {
      let temp = "";
      if (!_.isEmpty(schedule))
        [temp] = schedule?.filter((i) => i.time === e.time);
      return _.isEmpty(temp)
        ? {
            comment: "",
            rating: "",
            status: "Lịch hẹn mới",
            time: e.time,
            user: {
              address: "",
              dayOfBirth: "",
              email: "",
              gender: "",
              name: "",
              phone: "",
              reason: "",
            },
          }
        : { ...temp };
    });
    const { detail } = dataUser;
    const { price, payment, note } = detail;
    const data = {
      doctor: {
        id: assistantInfo.doctor.id,
        name: assistantInfo.doctor.name,
      },
      packet: {
        id: null,
        name: null,
      },
      schedule: [...listTime],
      detail: {
        price,
        payment,
        note,
      },
      date: dayjs(date).unix(),
    };
    upsertSchedule(data);
  };

  return (
    <>
      <Box m="20px">
        <Header title="Quản lý lịch khám bệnh" />
        <Grid container spacing={2} display="flex" justifyContent={"center"}>
          <Grid item md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <StaticDatePicker
                    className="day-picker"
                    disablePast
                    minDate={tomorrow}
                    displayStaticWrapperAs="desktop"
                    value={date}
                    onChange={(newValue) => {
                      handleChangeDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(100px, 1fr))",
                        gap: 1,
                      }}
                    >
                      {timeSchedule &&
                        timeSchedule.length > 0 &&
                        timeSchedule.map((e) => (
                          <Button
                            key={e.id}
                            variant={
                              e.active === true ? "contained" : "outlined"
                            }
                            // color={errors?.time ? "error" : "primary"}
                            onClick={() => handleClickTime(e)}
                          >
                            {e.name}
                          </Button>
                        ))}
                    </Box>
                    <FormHelperText error={errors?.time ? true : false}>
                      {errors?.time}
                    </FormHelperText>
                  </CardContent>
                </Card>
              </Grid>
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
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allcodes: state.admin.allcodes,
    user: state.admin.user,
    userSchedule: state.admin.schedule,
    isSuccess: state.app.isSuccess,
    assistantInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    upsertSchedule: (data) => dispatch(actions.upsertScheduleAction(data)),
    getSingleUser: (id) => dispatch(actions.getSingleUserAction(id)),
    getSingleUserSchedule: (id, date) =>
      dispatch(actions.getSingleUserScheduleAction(id, date)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssistantManageSchedule);
