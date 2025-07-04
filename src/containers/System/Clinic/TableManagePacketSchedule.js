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
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  OutlinedInput,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Collapse,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Header from "../../../components/Header.jsx";
import _ from "lodash";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import Select from "react-select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import DetailSchedule from "../Doctor/DetailSchedule";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";
const TableManagePacketSchedule = ({
  listClinic,
  getListClinicHomePatient,
  isSuccess,
  schedulePacket,
  getPacketScheduleByDate,
  clearStatus,
  allcodes,
  fetchAllcode,
}) => {
  const [date, setDate] = useState(
    dayjs(new Date().setHours(0, 0, 0)).format("D MMMM YYYY")
  );

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [viewPatient, setViewPatient] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listSelectClinic, setListSelectClinic] = useState([]);
  const [selectClinic, setSelectClinic] = useState("");
  const [dataTime, setDataTime] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
    },
  }));

  useEffect(() => {
    getListClinicHomePatient();
    fetchAllcode();
  }, []);

  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
  }, [date]);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        const clinicId = selectClinic?.value ? selectClinic.value : "";
        fetchDataAPI(page + 1, rowsPerPage, clinicId);
        setOpen(false);
      }
      clearStatus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (allcodes && allcodes.length > 0)
      setDataTime(allcodes.filter((e) => e.type === "TIME"));
  }, [allcodes]);

  useEffect(() => {
    if (schedulePacket.list && schedulePacket.list.length > 0) {
      setData(schedulePacket.list);
    } else {
      setData([]);
    }
    if (listClinic && listClinic.length > 0);
    setListSelectClinic(
      listClinic.map((e) => ({
        value: e._id,
        label: e.name,
      }))
    );
  }, [listClinic, schedulePacket]);

  useEffect(() => {
    if (selectClinic === "") return;
    setPage(0);
    const clinicId = selectClinic.value;
    fetchDataAPI(1, rowsPerPage, clinicId, "");
  }, [selectClinic]);

  const fetchDataAPI = (page, size, clinicId = "", filter = "") => {
    const data = {
      page,
      size,
      clinicId,
      filter,
      date: dayjs(date).unix(),
    };
    getPacketScheduleByDate(data);
  };

  const handelClickEmpty = () => {
    setSelectClinic("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10, "", "");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const clinicId = selectClinic.value ? selectClinic.value : "";
    fetchDataAPI(newPage + 1, rowsPerPage, clinicId);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    const clinicId = selectClinic.value ? selectClinic.value : "";
    fetchDataAPI(page + 1, +event.target.value, clinicId);
  };
  const handleClickView = (data, packet) => {
    setViewPatient({ ...data, packet });
    setOpen(true);
  };

  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell></StyledTableCell>
      <StyledTableCell>Gói khám</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Chuyên khoa</StyledTableCell>
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
    const [openRow, setOpenRow] = useState(false);
    const { schedule, packet, detail } = props;
    let id,
      name = "";
    if (packet) {
      name = packet.name;
      id = packet.id;
    }
    let clinic,
      specialty,
      image = "";
    if (id) {
      clinic = id.clinic;
      specialty = id.specialty;
      image = id.image;
    }
    const dataPacket = {
      id: packet?.id?._id,
      name,
      specialty,
      clinic,
      detail: props?.detail,
    };
    return (
      <>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenRow(!openRow)}
            >
              {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img
                  className="table__clinic--logo"
                  src={image?.url ? image.url : ""}
                  alt={name ? name : ""}
                />
              </div>
              <div> {name ? name : "-"}</div>
            </span>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {clinic?.name ? clinic.name : "-"}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {specialty?.name ? specialty.name : "-"}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={openRow} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Bệnh nhân</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Sốt điện thoại</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule &&
                      schedule.length > 0 &&
                      schedule.map((e) => (
                        <TableRow key={e._id}>
                          <TableCell component="th" scope="row">
                            {dataTime.map((i) => {
                              if (i._id === e.time) return i.valueVI;
                            })}
                          </TableCell>
                          <TableCell>
                            {e?.user?.name ? e?.user.name : "-"}
                          </TableCell>
                          <TableCell>
                            {e?.user?.email ? e?.user.email : "-"}
                          </TableCell>
                          <TableCell>
                            {e?.user?.phone ? e?.user.phone : "-"}
                          </TableCell>
                          <TableCell>
                            {statusList.map((i) => {
                              if (i.name === e.status)
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
                          </TableCell>
                          <TableCell>
                            <PermissionsGate
                              scopes={[scopes.PACKET_SCHEDULE_VIEW]}
                            >
                              <Tooltip title="Xem">
                                <IconButton
                                  onClick={() => handleClickView(e, dataPacket)}
                                >
                                  <RemoveRedEyeRoundedIcon />
                                </IconButton>
                              </Tooltip>
                            </PermissionsGate>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header title="danh sách lịch khám gói khám" />
        <Box m="20px 0 0 0">
          <Box m="0 0 7px 0">
            <Grid container spacing={2}>
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
              <Grid item xs={12} md={3}>
                <Select
                  className={`react-select-container`}
                  value={selectClinic}
                  onChange={(e) => setSelectClinic(e)}
                  options={listSelectClinic}
                  placeholder="Lọc theo cơ sở"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({
                      ...base,
                      zIndex: 9999,
                    }),
                  }}
                />
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
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 550 }}
            aria-label="collapsible table"
          >
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
                  data.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {schedulePacket && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={parseInt(schedulePacket?.count ? schedulePacket.count : 0)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Box>
      </Box>
      {viewPatient && (
        <DetailSchedule
          open={open}
          setOpen={setOpen}
          data={viewPatient}
          date={date}
          dataTime={dataTime}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    schedulePacket: state.admin.schedules,
    isSuccess: state.app.isSuccess,
    listClinic: state.client.listClinic,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPacketScheduleByDate: (date) =>
      dispatch(actions.getPacketScheduleByDateAction(date)),
    clearStatus: () => dispatch(actions.clearStatus()),
    getListClinicHomePatient: () =>
      dispatch(actions.getListClinicHomePatientAction()),
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManagePacketSchedule);
