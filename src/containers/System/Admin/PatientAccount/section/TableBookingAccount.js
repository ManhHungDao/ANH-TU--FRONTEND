import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../../store/actions";
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
  Unstable_Grid2 as Grid,
  TablePagination,
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
import ModalDetailBooking from "./ModalDetailBooking";

const TableBookingAccount = ({
  allcodeType,
  fetchAllcodeByType,
  getAllBookingByEmail,
  listBookingByEmail,
  isSuccess,
  clearStatus,
  data,
}) => {
  const [date, setDate] = useState(null);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataSentDetail, setDataSentDetail] = useState({
    id: "",
    time: "",
  });
  const [open, setOpen] = useState(false);

  const fetchData = (date, page, size) => {
    const dataSent = {
      email: data?.email,
      date,
      page,
      size,
    };
    getAllBookingByEmail(dataSent);
  };

  useEffect(() => {
    fetchAllcodeByType({
      page: 1,
      size: 999,
      filter: "TIME",
    });
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      setOpen(false);
      fetchData(dayjs(date).unix(), page + 1, rowsPerPage);
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
    setPage(0);
    setRowsPerPage(10);
    if (date) fetchData(dayjs(date).unix(), page + 1, rowsPerPage);
    else {
      fetchData("", page + 1, rowsPerPage);
    }
  }, [date]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (date) fetchData(dayjs(date).unix(), newPage + 1, rowsPerPage);
    else {
      fetchData("", newPage + 1, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    if (date) fetchData(dayjs(date).unix(), page + 1, +event.target.value);
    else {
      fetchData("", page + 1, +event.target.value);
    }
  };

  const handleRefresh = () => {
    setDate(null);
  };
  const handleClickView = (props) => {
    setDataSentDetail({
      id: props._id,
      time: props.schedule.time,
    });
    setOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
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
    const { doctor, packet, date, schedule } = props;
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

  return (
    <>
      <Box m="0 0 7px 0">
        <Grid container spacing={2}>
          <Grid item sm={4} xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={
          listBookingByEmail.count ? parseInt(listBookingByEmail.count) : 0
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table__user--pagination"
      />
      <ModalDetailBooking
        open={open}
        setOpen={setOpen}
        dataFetch={dataSentDetail}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allcodeType: state.client.allcodeType,
    listBookingByEmail: state.patient.listBookingByEmail,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBookingAccount);
