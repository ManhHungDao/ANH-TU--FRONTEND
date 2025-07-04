import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  OutlinedInput,
  FormControl,
  InputAdornment,
  Paper,
  Button,
  FormHelperText,
} from "@mui/material";
import _ from "lodash";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import InputSelect from "../../../components/Input/InputSelect";
import ButtonComponent from "../../../components/ButtonComponent";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import { getSinglePacketSchedule } from "../../../services/scheduleService";
const tomorrow = dayjs().add(1, "day");

const ManagePacketSchedule = ({
  listPacket,
  fetchAllcode,
  isSuccess,
  clearStatus,
  upsertSchedule,
  deleteSchedule,
  getAllPacket,
  allcodes,
  loadingToggleAction,
}) => {
  const [image, setImage] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [packets, setPackets] = useState([]);
  const [date, setDate] = useState(
    dayjs(new Date(tomorrow).setHours(0, 0, 0)).format("D MMMM YYYY")
  );
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [packetEdit, setPacketEdit] = useState("");
  const [packetDelete, setPacketDelete] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [errors, setErrors] = useState({});
  const [timeSchedule, setTimeSchedule] = useState([]);
  const [open, setOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState("");

  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
    fetchAllcode();
    setNote("");
    setPrice("");
    setOpen("");
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      setPayment("");
      setPrice("");
      setPacketEdit("");
      setImage("");
      setClinic("");
      setSpecialty("");
      setName("");
      setNote("");
      setDate(
        dayjs(new Date(tomorrow).setHours(0, 0, 0)).format("D MMMM YYYY")
      );
      setTimeSchedule(timeSchedule.map((item) => ({ ...item, active: false })));
      setPacketDelete("");
      setOpen(false);
    }
    clearStatus();
  }, [isSuccess]);

  useEffect(() => {
    if (listPacket.list && listPacket.list.length > 0) {
      setPackets(
        listPacket.list.map((i) => {
          return {
            ...i,
            id: i._id,
            image: i.image.url,
          };
        })
      );
    } else {
      setPackets([]);
    }
    if (allcodes && allcodes.length > 0) {
      setDataSelect(
        allcodes.map((e) => ({
          id: e._id,
          name: e.valueVI,
          type: e.type,
        }))
      );
      setTimeSchedule(
        allcodes
          .filter((e) => e.type === "TIME")
          .map((e) => ({
            id: e._id,
            name: e.valueVI,
            active: false,
          }))
      );
    }
  }, [listPacket, allcodes]);
  const fetchDataSchedule = async (id, date) => {
    loadingToggleAction(true);
    const res = await getSinglePacketSchedule(id, date);
    if (res && res.success === true) {
      const data = res.schedule;
      const { detail, schedule } = data;
      setScheduleData(schedule);
      setNote(detail?.note ? detail.note : "");
      setPayment({
        value: detail?.payment?.id ? detail.payment.id : "",
        label: detail?.payment?.name ? detail.payment.name : "",
      });
      setPrice({
        value: detail?.price?.id ? detail.price.id : "",
        label: detail?.price?.name ? detail.price.name : "",
      });
      if (schedule && schedule.length > 0) {
        let list = timeSchedule.map((e) => {
          schedule.map((item) => {
            if (item.time === e.id) {
              e.active = true;
            }
            return e;
          });
          return e;
        });
        setTimeSchedule(list);
        loadingToggleAction(false);
      }
    } else if (res.success === false) {
      setScheduleData([]);
      setNote(packetEdit?.detail?.note ? packetEdit.detail.note : "");
      setPayment({
        value: packetEdit?.payment?.id ? packetEdit.payment.id : "",
        label: packetEdit?.payment?.name ? packetEdit.payment.name : "",
      });
      setPrice({
        value: packetEdit?.price?.id ? packetEdit.price.id : "",
        label: packetEdit?.price?.name ? packetEdit.price.name : "",
      });
      loadingToggleAction(false);
    }
  };
  useEffect(() => {
    setErrors({});
    setTimeSchedule(
      timeSchedule.map((item) => {
        item.active = false;
        return item;
      })
    );
    if (!_.isEmpty(packetEdit)) {
      const { clinic, specialty, payment, price, image, name, _id, note } =
        packetEdit;
      setImage(image ? image : "");
      setClinic(clinic?.name ? clinic.name : "");
      setSpecialty(specialty?.name ? specialty.name : "");
      setName(name ? name : "");

      fetchDataSchedule(_id, dayjs(date).unix());
    }
  }, [packetEdit]);

  useEffect(() => {
    if (!_.isEmpty(packetEdit)) {
      setTimeSchedule(
        timeSchedule.map((item) => {
          item.active = false;
          return item;
        })
      );
      const id = packetEdit._id || packetEdit.id;
      fetchDataSchedule(id, dayjs(date).unix());
    }
  }, [date]);

  const fetchDataAPI = (page, size, clinicId = "", filter = "") => {
    const data = {
      page,
      size,
      clinicId,
      filter,
      type: "",
    };
    getAllPacket(data);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage + 1, rowsPerPage, "", search);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchDataAPI(page + 1, +event.target.value, "", search);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      minWidth: 170,
    },
  }));
  const handleDeleteSchedule = () => {
    if (!packetDelete) return;
    const data = {
      doctorId: "",
      date: dayjs(date).unix(),
      packetId: packetDelete.id,
    };
    deleteSchedule(data);
  };

  const handelClickDelete = (user) => {
    setOpen(true);
    setPacketDelete(user);
  };
  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleEnterSearch = (e) => {
    if (e.which === 13) {
      handleClickSearch();
    }
  };
  const handleClickSearch = () => {
    setPage(0);
    fetchDataAPI(1, rowsPerPage, "", search);
  };
  const handelClickEmpty = () => {
    setSearch("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10, "", "");
  };

  const checkValidate = () => {
    let errors = {};
    // if (!note) errors.note = "Ghi chú không được bỏ trống";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
    let activeTime = timeSchedule.filter((e) => e.active === true);
    if (activeTime.length <= 0) errors.time = "Chưa chọn thời gian khám";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  const enableClick = (time) => {
    if (_.isEmpty(scheduleData)) return true;
    const [existed] = scheduleData.filter((e) => e.time === time);
    if (existed)
      if (existed?.status !== "Đã hủy" && existed?.status !== "Lịch hẹn mới") {
        toast.error("Đã có bệnh nhân đặt lịch");
        return false;
      }
    return true;
  };

  const handleClickTime = (e) => {
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
    if (_.isEmpty(packetEdit)) {
      toast.error("Chưa chọn gói khám");
      return;
    }
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let listTime = timeSchedule
      .filter((e) => e.active === true)
      .map((e) => ({ time: e.id }));
    listTime = listTime.map((e) => {
      let temp = "";
      if (!_.isEmpty(scheduleData))
        [temp] = scheduleData?.filter((i) => i.time === e.time);
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
    const data = {
      packet: {
        id: packetEdit.id,
        name: packetEdit.name,
      },
      doctor: {
        id: null,
        name: null,
      },
      detail: {
        price: {
          id: price.value ? price.value : null,
          name: price.label ? price.label : null,
        },
        payment: {
          id: payment.value ? payment.value : null,
          name: payment.label ? payment.label : null,
        },
        note: note,
      },
      schedule: [...listTime],
      date: dayjs(date).unix(),
    };
    console.log("~ packet:", data);
    upsertSchedule(data);
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Tên gói khám</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Loại</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { clinic, specialty, name, image, type } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img
                  className="table__clinic--logo"
                  src={image ? image : ""}
                  alt={name ? name : ""}
                />
              </div>
              <div> {name ? name : ""}</div>
            </span>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {clinic?.name ? clinic.name : ""}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="">{type?.typeCode?.name || ""}</Typography>
          </TableCell>
          <TableCell>
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => setPacketEdit(props)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handelClickDelete(props)}>
                <DeleteIcon />
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
        <Header title="Quản lý lịch gói khám bệnh" />
        <Grid container spacing={2}>
          <Grid item sx={{ boder: "1px solid red" }} md={6} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <UpLoadAvatar
                            preWidth="300px"
                            preHeight="200px"
                            borderRadius="0px"
                            backgroundSize="cover"
                            image={image}
                            isDetail={true}
                            disableEdit={true}
                          />
                          <Typography gutterBottom variant="h5">
                            <Box
                              width="100%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                              backgroundColor="#4cceac"
                              borderRadius="4px"
                            >
                              <Typography
                                color="#141414"
                                sx={{
                                  ml: "5px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {name ? name : ""}
                              </Typography>
                            </Box>
                          </Typography>
                          <Grid item md={12} xs={12}>
                            <Typography color="text.secondary" variant="body2">
                              <HomeWorkOutlinedIcon />
                              <span className="m-1">
                                {clinic ? clinic : ""}
                                {specialty ? ` - ${specialty}` : ""}
                              </span>
                            </Typography>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
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
                      setDate(dayjs(new Date(newValue).setHours(0, 0, 0)));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <InputSelect
                      label="Chọn giá (VNĐ)"
                      value={price}
                      onChange={setPrice}
                      data={dataSelect.filter((e) => e.type === "PRICE")}
                      isError={errors.price ? true : false}
                      errorText={errors.price ? errors.price : ""}
                      name="Chọn giá (VNĐ)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputSelect
                      label="Chọn phương thức thanh toán"
                      value={payment}
                      onChange={setPayment}
                      data={dataSelect.filter((e) => e.type === "PAYMENT")}
                      isError={errors.payment ? true : false}
                      errorText={errors.payment ? errors.payment : ""}
                      name="Chọn phương thức thanh toán"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Ghi chú"
                  multiline
                  maxRows={4}
                  fullWidth
                  // required
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  error={errors.note ? true : false}
                  helperText={errors.note}
                />
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
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={8} md={5}>
                <FormControl sx={{ width: "100%" }} variant="outlined">
                  <OutlinedInput
                    placeholder="Lọc theo tên"
                    id="outlined-adornment-weight"
                    value={search}
                    onChange={(e) => handleOnChangeSearch(e)}
                    onKeyPress={(e) => handleEnterSearch(e)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickSearch}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm mới">
                  <IconButton onClick={() => handelClickEmpty()}>
                    <CachedIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item xs={12} md={12}>
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
                      {packets &&
                        packets.length > 0 &&
                        packets.map((e) => <TableColumn key={e.id} {...e} />)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>

            {packets && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={parseInt(listPacket?.count ? listPacket.count : 0)}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="table__user--pagination"
              />
            )}
            {/*   bảng chọn người dùng */}
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
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Xóa lịch khám bệnh"
        content={`${packetDelete?.name ? packetDelete.name : ""}`}
        type="DELETE"
        confirmFunc={handleDeleteSchedule}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allcodes: state.admin.allcodes,
    isSuccess: state.app.isSuccess,
    listPacket: state.admin.listPacket,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    deleteSchedule: (id, date) =>
      dispatch(actions.deleteScheduleAction(id, date)),
    upsertSchedule: (data) => dispatch(actions.upsertScheduleAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
    getAllPacket: (data) => dispatch(actions.getAllPacketAction(data)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePacketSchedule);
