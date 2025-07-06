import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/Section/Header";
import Header from "../../../components/Header";
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
  TextField,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import CachedIcon from "@mui/icons-material/Cached";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import _ from "lodash";
import { getDetailSchedule } from "../../../services/scheduleService";
import {
  ScheduleProfile,
  DetailExam,
  PatientProfile,
  DetailPrescription,
} from "./section/DetailProfile";
const ManageBooking = ({
  allcodeType,
  fetchAllcodeByType,
  getAllBookingByEmail,
  listBookingByEmail,
  patientInfo,
  isSuccess,
  clearStatus,
  updateStatusSchedule,
  loadingToggleAction,
  getSinglePrescription,
  prescription,
}) => {
  const [date, setDate] = useState(
    dayjs(new Date().setHours(0, 0, 0)).format("D MMMM YYYY")
  );
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [timeText, setTimeText] = useState("");
  const [detailSchedule, setDetailSchedule] = useState("");
  const [status, setStatus] = useState();
  const curStatus = useRef();

  const fetchDataDetailSchedule = async (id, time) => {
    try {
      loadingToggleAction(true);
      let res = await getDetailSchedule(id, time);
      if (res && res.success) {
        setDetailSchedule(res.schedule);
        setStatus(res.schedule.schedule.status);
        curStatus.current = res.schedule.schedule.status;
        loadingToggleAction(false);
        // foarmat data to component
      } else {
        loadingToggleAction(false);
      }
    } catch (error) {
      loadingToggleAction(false);
    }
  };

  const fetchData = (date) => {
    const data = {
      email: patientInfo.email,
      date,
      page: 1,
      size: 999,
    };
    getAllBookingByEmail(data);
  };

  useEffect(() => {
    fetchAllcodeByType({
      page: 1,
      size: 999,
      filter: "TIME",
    });
  }, []);

  useEffect(() => {
    if (status !== "Hoàn thành") return;
    getSinglePrescription(detailSchedule.schedule._id);
  }, [status]);

  useEffect(() => {
    if (isSuccess === true) {
      setStatus("");
      setOpen(false);
      fetchData(dayjs(date).unix());
    }
    clearStatus();
  }, [isSuccess]);

  useEffect(() => {
    if (!_.isEmpty(listBookingByEmail) && listBookingByEmail.list.length > 0)
      setList(listBookingByEmail.list);
    else {
      setList([]);
    }
  }, [listBookingByEmail]);

  useEffect(() => {
    fetchData(dayjs(date).unix());
  }, [date]);

  const handleRefresh = () => {
    fetchData(dayjs(date).unix());
  };

  const handleClickView = (props) => {
    let [time] = allcodeType.list.filter((i) => i._id === props.schedule.time);
    setTimeText(time.valueVI);
    fetchDataDetailSchedule(props._id, props.schedule.time);
    setOpen(true);
  };
  const handleUploadStatus = (status) => {
    if (!detailSchedule) return;
    const [doctor] = detailSchedule.doctor;
    const [packet] = detailSchedule.packet;
    let value = status;
    let dataSend = {
      status: value,
      date: detailSchedule.date,
      time: detailSchedule.schedule.time,
      doctorId: doctor?._id ? doctor?._id : null,
      packetId: packet?._id ? packet?._id : null,
    };
    updateStatusSchedule(dataSend);
  };
  const handleCloseModal = () => {
    setStatus("");
    setOpen(false);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#64b9e5",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      padding: "10px",
      fontSize: "12px",
      maxWidth: "150px",
      height: "50px",
    },
  }));
  const statusList = [
    { name: "Lịch hẹn mới", color: "#80d8ff" },
    { name: "Chờ xác nhận", color: "#78909c" },
    { name: "Đã xác nhận", color: "#26a69a" },
    { name: "Đang khám", color: "#e6ee9c" },
    { name: "Hoàn thành", color: "#00e676" },
    { name: "Đã hủy", color: "#ff9100" },
  ];
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Bác sĩ </StyledTableCell>
      <StyledTableCell>Gói khám </StyledTableCell>
      <StyledTableCell>Thời gian </StyledTableCell>
      <StyledTableCell>Trạng thái</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, doctor, packet, date, schedule } = props;
    return (
      <>
        <TableRow>
          <StyledTableCell>{doctor?.name ? doctor.name : "-"}</StyledTableCell>
          <StyledTableCell>{packet?.name ? packet.name : "-"}</StyledTableCell>
          <StyledTableCell>
            {allcodeType?.list?.length > 0 &&
              allcodeType.list.map((i) => {
                if (i._id === schedule.time) return i.valueVI;
              })}
            &nbsp;- {dayjs.unix(date).format("DD/MM/YYYY")}
          </StyledTableCell>
          <StyledTableCell>
            {schedule?.status && (
              <>
                {statusList.map((i) => {
                  if (i.name === schedule.status)
                    return (
                      <>
                        <Box
                          p={1}
                          sx={{
                            backgroundColor: i.color,
                            borderRadius: 1,
                            width: "fit-content",
                          }}
                        >
                          {i.name}
                        </Box>
                      </>
                    );
                })}
              </>
            )}
          </StyledTableCell>
          <StyledTableCell>
            <Tooltip title="Xem" onClick={() => handleClickView(props)}>
              <IconButton>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
        </TableRow>
      </>
    );
  };

  const style = {
    position: "absolute",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "fit-content",
    maxHeight: "80vh",
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: 0,
    right: 0,
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
          <Header title="quản lý lịch khám" />
          <Box mb={"7px"}>
            <Grid container spacing={2}>
              <Grid item sm={4} xs={6} md={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="vi"
                >
                  <DatePicker
                    label="Ngày"
                    openTo="day"
                    views={["year", "month", "day"]}
                    value={date}
                    onChange={(newValue) => {
                      setDate(dayjs(new Date(newValue).setHours(0, 0, 0)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton
                    onClick={() => {
                      handleRefresh();
                    }}
                  >
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <TableContainer component={Paper} sx={{ maxHeight: 560 }}>
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
                {list &&
                  list.length > 0 &&
                  list.map((e, i) => (
                    <React.Fragment key={i}>
                      <TableColumn {...e} />
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
      {detailSchedule && open === true && (
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box m="20px">
              <Header title="Chi tiết lịch khám" />
            </Box>
            <Container maxWidth="lg">
              <Stack>
                {detailSchedule && (
                  <>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <PatientProfile data={detailSchedule} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <DetailExam
                          data={detailSchedule}
                          enableFeeback={status === "Hoàn thành" ? true : false}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <ScheduleProfile
                          status={status}
                          time={timeText}
                          setStatus={setStatus}
                          handleSave={handleUploadStatus}
                        />
                      </Grid>
                      {!_.isEmpty(prescription) && (
                        <Grid item xs={12} md={12}>
                          <DetailPrescription detail={prescription} />
                        </Grid>
                      )}
                    </Grid>
                  </>
                )}
              </Stack>
            </Container>
          </Box>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allcodeType: state.client.allcodeType,
    listBookingByEmail: state.patient.listBookingByEmail,
    patientInfo: state.patient.patientInfo,
    prescription: state.patient.prescription,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeByType: (data) =>
      dispatch(actions.fetchAllcodeByTypeHomeAction(data)),
    getAllBookingByEmail: (data) =>
      dispatch(actions.getAllBookingByEmailAction(data)),
    sentMail: (data) => dispatch(actions.sentMailAction(data)),
    updateStatusSchedule: (data) =>
      dispatch(actions.updateStatusScheduleAction(data)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
    getSinglePrescription: (id) =>
      dispatch(actions.getSinglePrescriptionAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
