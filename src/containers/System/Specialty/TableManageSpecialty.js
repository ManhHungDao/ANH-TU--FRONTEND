import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import {
  Grid,
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import Header from "../../../components/Header";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import DeleteIcon from "@mui/icons-material/Delete";
import CachedIcon from "@mui/icons-material/Cached";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DetailSpecialty from "./DetailSpecialty";
import { tableCellClasses } from "@mui/material/TableCell";
import Select from "react-select";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";

const TableManageSpecialty = ({
  getAllSpecialtyAction,
  listSpecialty,
  deleteSpecialtyAction,
  isSuccess,
  clearStatus,
  listClinic,
  getListClinicHomePatient,
}) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [specialtyEdit, setSpecialtyEdit] = useState("");
  const [specialtyDelete, setSpecialtyDelete] = useState("");
  const [data, setData] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);

  const [listSelectClinic, setListSelectClinic] = useState([]);
  const [selectClinic, setSelectClinic] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
    getListClinicHomePatient();
  }, []);

  useEffect(() => {
    if (listClinic && listClinic.length > 0)
      setListSelectClinic(
        listClinic.map((e) => ({
          value: e._id,
          label: e.name,
        }))
      );
    if (listSpecialty.list && listSpecialty.list.length > 0)
      setData(listSpecialty.list);
    else {
      setData([]);
    }
  }, [listClinic, listSpecialty]);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        const clinicId = selectClinic?.value ? selectClinic.value : "";
        const searchValue = search ? search : "";
        fetchDataAPI(page + 1, rowsPerPage, clinicId, searchValue);
        setOpen(false);
        setSpecialtyEdit("");
        setSpecialtyDelete("");
        setEnableEdit(false);
      }
      setOpenConfirmModal(false);
      clearStatus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (selectClinic === "") return;
    setSearch("");
    setPage(0);
    const clinicId = selectClinic.value;
    fetchDataAPI(1, rowsPerPage, clinicId, "");
  }, [selectClinic]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
    },
  }));

  const fetchDataAPI = (page, size, clinicId = "", filter = "") => {
    const data = {
      page,
      size,
      clinicId,
      filter,
    };
    getAllSpecialtyAction(data);
  };

  const handleClickView = (data) => {
    setSpecialtyEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (data) => {
    setOpenConfirmModal(true);
    setSpecialtyDelete(data);
  };
  const handleDeleteClinic = () => {
    if (specialtyDelete) deleteSpecialtyAction(specialtyDelete._id);
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
  const handelClickEmpty = () => {
    setSearch("");
    setSelectClinic("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10, "", "");
  };
  const handleOnChangeSearch = (e) => {
    setSelectClinic("");
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
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Tên chuyên khoa</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Phổ biến</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, clinic, name, image, popular, detail } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img
                  className="table__clinic--logo"
                  src={image?.url ? image.url : ""}
                  alt={name ? name : ""}
                />
              </div>
              <div> {name ? name : ""}</div>
            </span>
          </TableCell>
          <TableCell>{clinic?.name ? clinic.name : "-"}</TableCell>
          <TableCell>{popular ? <CheckCircleOutlineIcon /> : "-"}</TableCell>
          <TableCell>
            <PermissionsGate scopes={[scopes.SPECIALTY_VIEW]}>
              <Tooltip title="Xem">
                <IconButton onClick={() => handleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.SPECIALTY_DELETE]}>
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
          title="Quản lý danh sách chuyên khoa"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-specialty"
          activeMenu="Thêm chuyên khoa"
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
                  onChange={setSelectClinic}
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
              <Grid item sm={6} md={3} display="flex" alignItems="center">
                <Tooltip title="Làm trống">
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
            count={parseInt(listSpecialty?.count ? listSpecialty.count : 0)}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table__clinic--pagination"
          />
        </Box>
      </Box>
      {specialtyEdit && (
        <DetailSpecialty
          setOpen={setOpen}
          open={open}
          specialty={specialtyEdit}
          setEnableEdit={setEnableEdit}
          enableEdit={enableEdit}
        />
      )}
      {specialtyDelete && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa chuyên khoa"
          content={`${specialtyDelete?.name ? specialtyDelete.name : ""} ${
            specialtyDelete?.clinic?.name
              ? `- ${
                  specialtyDelete?.clinic?.name
                    ? specialtyDelete?.clinic?.name
                    : ""
                }`
              : ""
          } `}
          type="DELETE"
          confirmFunc={handleDeleteClinic}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    listSpecialty: state.admin.listSpecialty,
    isSuccess: state.app.isSuccess,
    listClinic: state.client.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllSpecialtyAction: (data) =>
      dispatch(actions.getAllSpecialtyAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
    deleteSpecialtyAction: (id) => dispatch(actions.deleteSpecialtyAction(id)),
    getListClinicHomePatient: () =>
      dispatch(actions.getListClinicHomePatientAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
