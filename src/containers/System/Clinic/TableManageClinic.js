import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import _ from "lodash";
import DetailClinic from "./DetailClinic";
import "./style.scss";
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
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";

const TableManageClinic = ({
  getListClinicAction,
  listClinic,
  isSuccess,
  clearStatus,
  deleteClincAction,
}) => {
  const [list, setList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [clinicEdit, setClinicEdit] = useState({});
  const [clinicDelete, setClinicDelete] = useState({});
  const [search, setSearch] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
      // minWidth: 170,
    },
  }));
  useEffect(() => {
    fetchDataAPI(1, rowsPerPage);
  }, []);
  useEffect(() => {
    if (listClinic.list && listClinic.list.length > 0) {
      let data = listClinic.list.map((e) => {
        return {
          id: e._id,
          logo: e.logo.url,
          image: e.image.url,
          name: e.name,
          address: e.address,
          introduce: e.introduce,
          detail: e.detail,
          views: e.views,
        };
      });
      setList(data);
    } else {
      setList([]);
    }
  }, [listClinic]);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        setOpen(false);
        setEnableEdit(false);
        const searchValue = search ? search : "";
        fetchDataAPI(page + 1, rowsPerPage, searchValue);
      }
      setOpenConfirmModal(false);
      clearStatus();
    }
  }, [isSuccess]);

  const fetchDataAPI = (page, size, filter = "") => {
    const data = {
      page,
      size,
      filter,
    };
    getListClinicAction(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage + 1, rowsPerPage, search);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchDataAPI(page + 1, +event.target.value, search);
  };

  const handleClickView = (data) => {
    setClinicEdit(data);
    setOpen(true);
  };
  const handelClickDelete = (data) => {
    setOpenConfirmModal(true);
    setClinicDelete(data);
  };
  const handleDeleteClinic = () => {
    const id = clinicDelete.id;
    if (id) deleteClincAction(id);
  };
  const handelClickEmpty = () => {
    setSearch("");
    setPage(0);
    setRowsPerPage(10);
    fetchDataAPI(1, 10);
  };
  const handleClickSearch = () => {
    setPage(0);
    fetchDataAPI(1, rowsPerPage, search);
  };
  const handleEnterSearch = (e) => {
    if (e.which === 13) {
      handleClickSearch();
    }
  };
  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Cơ sở</StyledTableCell>
      <StyledTableCell>Địa chỉ</StyledTableCell>
      <StyledTableCell>Lượt truy cập</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, address, name, logo, views } = props;
    return (
      <>
        <TableRow>
          <TableCell>
            <span className="d-flex justify-content-start align-items-center gap-2">
              <div>
                <img className="table__clinic--logo" src={logo} alt={name} />
              </div>
              <div> {name}</div>
            </span>
          </TableCell>
          <TableCell>{address?.detail ? address.detail : ""}</TableCell>
          <TableCell>{views ? views : 0}</TableCell>
          <TableCell>
            <PermissionsGate scopes={[scopes.CLINIC_VIEW]}>
              <Tooltip title="Xem">
                <IconButton onClick={() => handleClickView(props)}>
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>
            </PermissionsGate>
            <PermissionsGate scopes={[scopes.CLINIC_DELETE]}>
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
          title="Quản lý danh sách phòng khám"
          subtitle="Quản lý phòng khám"
          titleBtn="Thêm mới"
          isShowBtn={true}
          link="/admin/add-clinic"
          activeMenu="Thêm phòng khám"
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
            count={parseInt(listClinic?.count ? listClinic.count : 0)}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table__clinic--pagination"
          />
        </Box>
      </Box>
      {clinicEdit && (
        <DetailClinic
          setOpen={setOpen}
          open={open}
          clinic={clinicEdit}
          enableEdit={enableEdit}
          setEnableEdit={setEnableEdit}
        />
      )}
      <ConfirmModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title="Xóa phòng khám"
        content={`${clinicDelete?.name ? clinicDelete.name : ""}`}
        type="DELETE"
        confirmFunc={handleDeleteClinic}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinic,
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAction: (data) => dispatch(actions.getListClinicAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
    deleteClincAction: (id) => dispatch(actions.deleteClincAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
