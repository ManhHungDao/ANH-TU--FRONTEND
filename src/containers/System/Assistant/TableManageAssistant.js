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
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Header from "../../../components/Header.jsx";
import _ from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
// import DetailUser from "./DetailUser";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import { scopes } from "../../../utils";
import { deleteAssistant } from "../../../services/assistantService";
import PermissionsGate from "../../../hoc/PermissionsGate";
import "./style.scss";
import { toast } from "react-toastify";
import DetailAssistant from "./DetailAssistant";

const TableManageAssistant = (props) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userDelete, setUserDelete] = useState({});
  const [idEdit, setIdEdit] = useState("");
  const [selectClinic, setSelectClinic] = useState("");
  const [search, setSearch] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      minWidth: 170,
    },
  }));

  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
  }, [enableEdit]);

  useEffect(() => {
    if (props.users.list && props.users.list.length > 0) {
      setUsers(
        props.users.list.map((i) => {
          return {
            ...i,
            id: i._id,
          };
        })
      );
    } else {
      setUsers([]);
    }
  }, [props.users]);

  useEffect(() => {
    if (selectClinic === "") return;
    setSearch("");
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
    };
    props.getAllUserAction(data);
  };

  const handelClickEmpty = () => {
    setSearch("");
    setSelectClinic("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10, "", "");
  };

  const handleClickSearch = () => {
    setPage(0);
    fetchDataAPI(1, rowsPerPage, "", search);
  };

  const handleEnterSearch = (e) => {
    if (e.which === 13) {
      handleClickSearch();
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const clinicId = selectClinic.value ? selectClinic.value : "";
    fetchDataAPI(newPage + 1, rowsPerPage, clinicId, search);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    const clinicId = selectClinic.value ? selectClinic.value : "";
    fetchDataAPI(page + 1, +event.target.value, clinicId, search);
  };

  const handleClickView = (data) => {
    setIdEdit(data._id);
    setOpen(true);
  };
  const handelClickDelete = (user) => {
    setOpenConfirmModal(true);
    setUserDelete(user);
  };
  const handleDeleteUser = async () => {
    try {
      await deleteAssistant(userDelete.id);
      toast.success("Xóa trợ lý thành công");
      fetchDataAPI(page, rowsPerPage);
      setOpenConfirmModal(false);
      setEnableEdit(false);
    } catch (error) {
      setOpenConfirmModal(false);
      toast.success("Xóa trợ lý thất bại");
    }
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Tên</StyledTableCell>
      <StyledTableCell>Email</StyledTableCell>
      <StyledTableCell>Số điện thoại</StyledTableCell>
      <StyledTableCell>Trợ lý của bác sĩ</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Chuyên khoa</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const handleOnChangeSearch = (e) => {
    setSelectClinic("");
    setSearch(e.target.value);
  };
  const TableColumn = (props) => {
    const { name, image, phone, email, doctor, _id } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img className="table__clinic--logo" src={image.url} alt="" />
              </div>
              <div style={{ textTransform: "capitalize" }}> {name}</div>
            </span>
          </TableCell>
          <TableCell>{email}</TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell>
            <Typography variant="">
              <span className="d-flex justify-content-start align-items-center gap-2">
                <div>
                  <img
                    className="table__clinic--logo"
                    src={doctor.id.image.url}
                    alt=""
                  />
                </div>
                <div> {doctor.id.name}</div>
              </span>
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="">{doctor.id.detail.clinic.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="">
              {doctor.id.detail.specialty.name}
            </Typography>
          </TableCell>
          <TableCell>
            <PermissionsGate scopes={[scopes.USER_VIEW]}>
              <Tooltip title="Xem">
                <IconButton onClick={() => handleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.USER_DELETE]}>
              <Tooltip title="Xóa">
                <IconButton onClick={() => handelClickDelete(props)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </PermissionsGate>
          </TableCell>
        </TableRow>
      </>
    );
  };
  return (
    <>
      <Box m="20px">
        <Header
          title="Danh sách trợ lí"
          subtitle="Quản lý thành viên"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-assistant"
          activeMenu="Thêm trợ lý"
        />
        <Box m="20px 0 0 0">
          <Box m="0 0 7px 0">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
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
                {users &&
                  users.length > 0 &&
                  users.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {users && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={parseInt(props.users?.count ? props.users.count : 0)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Box>
      </Box>
      {idEdit && (
        <DetailAssistant
          open={open}
          setOpen={setOpen}
          id={idEdit}
          enableEdit={enableEdit}
          setEnableEdit={setEnableEdit}
        />
      )}
      {userDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa trợ lí"
          content={`${userDelete.name}`}
          type="DELETE"
          confirmFunc={handleDeleteUser}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admin.assistants,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserAction: (data) => dispatch(actions.getAllAssistantAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageAssistant);
