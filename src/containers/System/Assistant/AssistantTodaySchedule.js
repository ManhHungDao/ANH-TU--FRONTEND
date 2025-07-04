import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Grid,
  TextField,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Header from "../../../components/Header.jsx";
import _ from "lodash";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DetailSchedule from "../Doctor/DetailSchedule";

const AssistantTodaySchedule = ({
  isSuccess,
  toDaySchedule,
  getSingleUserSchedule,
  fetchAllcode,
  allcodes,
  clearStatus,
  assistantInfo,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [dataTime, setDataTime] = useState([]);
  const [date, setDate] = useState(
    dayjs(new Date().setHours(0, 0, 0)).format("D MMMM YYYY")
  );

  useEffect(() => {
    fetchAllcode();
    dispatch({ type: "GET_SCHEDULE_FAILED" });
  }, []);

  useEffect(() => {
    if (open === false) {
      getSingleUserSchedule(assistantInfo.doctor.id, dayjs(date).unix());
      setOpen(false);
    }
  }, [open]);
  useEffect(() => {
    getSingleUserSchedule(assistantInfo.doctor.id, dayjs(date).unix());
  }, [date]);

  useEffect(() => {
    if (!_.isEmpty(toDaySchedule) && toDaySchedule.schedule.length > 0) {
      setData(toDaySchedule.schedule);
    } else {
      setData([]);
    }
    if (allcodes && allcodes.length > 0)
      setDataTime(allcodes.filter((e) => e.type === "TIME"));
  }, [toDaySchedule, allcodes]);
  console.log("🚀 toDaySchedule:", toDaySchedule);
  const handleClickView = (data) => {
    const doctor = {
      id: assistantInfo.doctor.id,
      email: toDaySchedule?.doctor?.id?.email,
      name: assistantInfo.doctor.name,
      clinic: toDaySchedule?.doctor?.id?.detail?.clinic,
      specialty: toDaySchedule?.doctor?.id?.detail?.specialty,
      detail: toDaySchedule?.detail,
    };

    setDataEdit({ ...data, doctor });
    setOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      minWidth: 170,
    },
  }));
  const handelClickEmpty = () => {
    getSingleUserSchedule(assistantInfo.doctor.id, dayjs(date).unix());
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Thời gian</StyledTableCell>
      <StyledTableCell>Bệnh nhân</StyledTableCell>
      <StyledTableCell>Email</StyledTableCell>
      <StyledTableCell>Số điện thoại</StyledTableCell>
      <StyledTableCell>Trạng thái</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );

  const statusList = [
    { name: "Lịch hẹn mới", color: "#80d8ff" },
    { name: "Chờ xác nhận", color: "#78909c" },
    { name: "Đã xác nhận", color: "#26a69a" },
    { name: "Đang khám", color: "#e6ee9c" },
    { name: "Hoàn thành", color: "#00e676" },
    { name: "Đã hủy", color: "#ff9100" },
  ];

  const TableColumn = (props) => {
    const { user, time, status } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            {dataTime.map((e) => {
              if (e._id === time) return e.valueVI;
            })}
          </TableCell>
          <TableCell>{user?.name ? user.name : ""}</TableCell>
          <TableCell>{user?.email ? user.email : ""}</TableCell>
          <TableCell>{user?.phone ? user.phone : ""}</TableCell>

          <TableCell>
            {statusList.map((e) => {
              if (e.name === status)
                return (
                  <>
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: e.color,
                        borderRadius: 1,
                        width: "fit-content",
                      }}
                    >
                      {e.name}
                    </Box>
                  </>
                );
            })}
          </TableCell>
          <TableCell>
            <Tooltip title="Xem">
              <IconButton onClick={() => handleClickView(props)}>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header title="Lịch khám cá nhân" />
        <Box m="20px 0 0 0">
          <Box m="0 0 7px 0">
            <Grid container>
              <Grid item xs={6} md={2}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <DatePicker
                    openTo="day"
                    label="Ngày khám"
                    views={["year", "month", "day"]}
                    value={date}
                    onChange={(newValue) => {
                      setDate(dayjs(new Date(newValue).setHours(0, 0, 0)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton onClick={() => handelClickEmpty()}>
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRowName />
              </TableHead>
              <TableBody>
                {data &&
                  data.length > 0 &&
                  data.map((e, i) => (
                    <TableColumn key={e.id + `${i}`} {...e} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {dataEdit && (
        <DetailSchedule
          open={open}
          setOpen={setOpen}
          data={dataEdit}
          dataTime={dataTime}
          date={date}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
    assistantInfo: state.user.userInfo,
    allcodes: state.admin.allcodes,
    toDaySchedule: state.admin.schedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearStatus: () => dispatch(actions.clearStatus()),
    getSingleUserSchedule: (id, date) =>
      dispatch(actions.getSingleUserScheduleAction(id, date)),
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssistantTodaySchedule);
