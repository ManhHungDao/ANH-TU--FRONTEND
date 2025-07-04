import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import _ from "lodash";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import { Paper, Grid, OutlinedInput } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Select from "react-select";
import Detailhandbook from "./Detailhandbook";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";
const TableManageHandbook = ({
  getAllHandbookAction,
  listHandbook,
  isSuccess,
  clearStatus,
  deleteHandbook,
  getAllSpecialtyInHandbook,
  listSpecialtyInHandbook,
}) => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [enableEdit, setEnableEdit] = useState(false);
  const [handbookEdit, setHandbookEdit] = useState({});
  const [handbookDelete, setHandbookDelete] = useState({});
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [listSelectSpecialty, setListSelectSpecialty] = useState([]);
  const [selectSpecialty, setSelectSpecialty] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllSpecialtyInHandbook();
    fetchDataAPI(1, rowsPerPage);
  }, []);

  useEffect(() => {
    if (listSpecialtyInHandbook && listSpecialtyInHandbook.length > 0)
      setListSelectSpecialty(
        listSpecialtyInHandbook.map((e) => ({
          value: e.id,
          label: e.name,
        }))
      );

    if (listHandbook.list && listHandbook.list.length > 0) {
      setList(
        listHandbook.list.map((i) => {
          return {
            ...i,
            id: i._id,
            image: i.image.url,
          };
        })
      );
    } else {
      setList([]);
    }
  }, [listSpecialtyInHandbook, listHandbook]);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        const specialtyId = selectSpecialty?.value ? selectSpecialty.value : "";
        const searchValue = search ? search : "";
        fetchDataAPI(page + 1, rowsPerPage, specialtyId, searchValue);
        setOpen(false);
        setEnableEdit(false);
      }
      setOpenConfirmModal(false);
      clearStatus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (selectSpecialty === "") return;
    setSearch("");
    setPage(0);
    const specialtyId = selectSpecialty.value;
    fetchDataAPI(1, rowsPerPage, specialtyId, "");
  }, [selectSpecialty]);

  const fetchDataAPI = (page, size, specialtyId = "", filter = "") => {
    const data = {
      page,
      size,
      specialtyId,
      filter,
    };
    getAllHandbookAction(data);
  };
  const handleDeleteClinic = () => {
    const id = handbookDelete.id;
    if (id) deleteHandbook(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const specialtyId = selectSpecialty.value ? selectSpecialty.value : "";
    fetchDataAPI(newPage + 1, rowsPerPage, specialtyId, search);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    const specialtyId = selectSpecialty.value ? selectSpecialty.value : "";
    fetchDataAPI(page + 1, +event.target.value, specialtyId, search);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      minWidth: 170,
    },
  }));
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Tên cẩm nang</StyledTableCell>
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Chuyên khoa</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const handleClickView = (data) => {
    setHandbookEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (data) => {
    setOpenConfirmModal(true);
    setHandbookDelete(data);
  };
  const handelClickEmpty = () => {
    setSelectSpecialty("");
    setSearch("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10, "", "");
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
  const TableColumn = (props) => {
    const { specialty, name, image, clinic } = props;
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
          <TableCell>{clinic?.name ? clinic.name : "-"}</TableCell>
          <TableCell>{specialty.name ? specialty.name : ""}</TableCell>
          <TableCell>
            <PermissionsGate scopes={[scopes.HANDBOOK_VIEW]}>
              <Tooltip title="Xem">
                <IconButton onClick={() => handleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.HANDBOOK_DELETE]}>
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
          title="Quản lý danh sách cẩm nang"
          subtitle="Quản lý phòng khám"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-handbook"
          activeMenu="Thêm cẩm nang"
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
                    onChange={(e) => setSearch(e.target.value)}
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
                  value={selectSpecialty}
                  onChange={(e) => setSelectSpecialty(e)}
                  options={listSelectSpecialty}
                  placeholder="Lọc theo chuyên khoa"
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
                {list &&
                  list.length > 0 &&
                  list.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={parseInt(listHandbook?.count ? listHandbook.count : 0)}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table__clinic--pagination"
          />
        </Box>
      </Box>
      {handbookEdit && (
        <Detailhandbook
          setOpen={setOpen}
          open={open}
          handbook={handbookEdit}
          enableEdit={enableEdit}
          setEnableEdit={setEnableEdit}
        />
      )}
      <ConfirmModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title="Xóa cẩm nang"
        content={`${handbookDelete.name ? handbookDelete.name : ""}`}
        type="DELETE"
        confirmFunc={handleDeleteClinic}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.client.listClinic,
    listHandbook: state.admin.listHandbook,
    listSpecialtyInHandbook: state.admin.listSpecialtyInHandbook,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: () =>
      dispatch(actions.getListClinicHomePatientAction()),
    getAllHandbookAction: (data) =>
      dispatch(actions.getAllHandbookAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
    deleteHandbook: (id) => dispatch(actions.deleteHandbookAction(id)),
    getAllSpecialtyInHandbook: () =>
      dispatch(actions.getAllSpecialtyInHandbookAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageHandbook);
