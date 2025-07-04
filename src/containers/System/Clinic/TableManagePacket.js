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
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import Select from "react-select";
import DetailPacket from "./DetailPacket";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";

const TableManagePacket = ({
  isSuccess,
  listClinic,
  getListClinicHomePatient,
  getAllPacket,
  listPacket,
  clearStatus,
  deletePacket,
}) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [packetEdit, setPacketEdit] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [packetDelete, setPacketDelete] = useState({});

  const [listSelectClinic, setListSelectClinic] = useState([]);
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
    getListClinicHomePatient();
  }, []);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        const clinicId = selectClinic?.value ? selectClinic.value : "";
        const searchValue = search ? search : "";
        fetchDataAPI(page + 1, rowsPerPage, clinicId, searchValue);
        setOpen(false);
        setEnableEdit(false);
      }
      setOpenConfirmModal(false);
      clearStatus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (listPacket.list && listPacket.list.length > 0) {
      setUsers(
        listPacket.list.map((i) => {
          return {
            ...i,
            id: i._id,
            image: i.image.url,
          };
        })
      );
    } else {
      setUsers([]);
    }
    if (listClinic && listClinic.length > 0);
    setListSelectClinic(
      listClinic.map((e) => ({
        value: e._id,
        label: e.name,
      }))
    );
  }, [listClinic, listPacket]);

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
      type: "",
    };
    getAllPacket(data);
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

  const hadnleClickView = (data) => {
    setPacketEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (user) => {
    setOpenConfirmModal(true);
    setPacketDelete(user);
  };
  const handleDeleteUser = () => {
    const id = packetDelete.id;
    if (id) deletePacket(id);
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Tên gói khám</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Giá tiền</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const handleOnChangeSearch = (e) => {
    setSelectClinic("");
    setSearch(e.target.value);
  };
  const TableColumn = (props) => {
    const { name, clinic, price, image } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img className="table__clinic--logo" src={image} alt={name} />
              </div>
              <div> {name}</div>
            </span>
          </TableCell>
          <TableCell>{clinic.name}</TableCell>
          <TableCell>{price.name}</TableCell>
          <TableCell>
            <PermissionsGate scopes={[scopes.PACKET_VIEW]}>
              <Tooltip title="Xem">
                <IconButton onClick={() => hadnleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.PACKET_DELETE]}>
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
          title="Danh sách gói khám"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-packet"
          activeMenu="Thêm gói khám"
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
              count={parseInt(listPacket?.count ? listPacket.count : 0)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Box>
      </Box>
      {packetEdit && (
        <DetailPacket
          setOpen={setOpen}
          open={open}
          packet={packetEdit}
          enableEdit={enableEdit}
          setEnableEdit={setEnableEdit}
        />
      )}
      {packetDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa người dùng"
          content={`${packetDelete?.name ? packetDelete.name : ""}`}
          type="DELETE"
          confirmFunc={handleDeleteUser}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listPacket: state.admin.listPacket,
    isSuccess: state.app.isSuccess,
    listClinic: state.client.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePacket: (id) => dispatch(actions.deletePacketAction(id)),
    getAllPacket: (data) => dispatch(actions.getAllPacketAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
    getListClinicHomePatient: () =>
      dispatch(actions.getListClinicHomePatientAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePacket);
