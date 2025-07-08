import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Header from "../../components/Header";
import _ from "lodash";
import "./style.scss";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
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
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Typography, Box, Grid, Paper, OutlinedInput } from "@mui/material";
import Image from "../../assets/word.png";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ModalEditFile from "../../components/modal/ModalEditFile";
import ModalViewFile from "../../components/modal/ModalViewFile";

const Addfile = ({
  getListClinicAction,
  listClinic,
  isSuccess,
  clearStatus,
}) => {
  const [list, setList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [clinicDelete, setClinicDelete] = useState({});
  const [search, setSearch] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [type, setType] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };

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
          logo: Image,
          name: e.name,
          address: e.address,
          introduce: e.introduce,
          detail: e.detail,
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
        setOpenEditModal(false);
        setOpenViewModal(false);
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

  const handleClickFile = (data, type) => {
    setIdFile(data.id);
    setContent(data);
    if (type === "Edit") {
      setOpenEditModal(true);
    } else if (type === "View") {
      setOpenViewModal(true);
    } else if (type === "Delete") {
      setOpenConfirmModal(true);
      setClinicDelete(data);
    }
  };
  const handleDeleteClinic = () => {
    const id = clinicDelete.id;
    // if (id) deleteClincAction(id);
  };
  const handelClickEmpty = () => {
    setSearch("");
    setPage(0);
    setType("");
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
      <StyledTableCell>Tên file</StyledTableCell>
      <StyledTableCell>Loại án</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { address, name, logo } = props;
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
          <TableCell>
            <Tooltip title="Xem">
              <IconButton onClick={() => handleClickFile(props, "View")}>
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton onClick={() => handleClickFile(props, "Edit")}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleClickFile(props, "Delete")}>
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
        <Header
          title="Quản lý danh sách tập tin"
          subtitle="Quản lý tệp tin"
          titleBtn="Thêm file"
          isShowBtn={true}
          // link="/add"
          activeMenu="Thêm phòng khám"
        />
        <Typography
          variant="h4"
          color="#141414"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0", textTransform: "capitalize" }}
        ></Typography>
        <Box m="20px 0 0 0">
          <Box m="0 0 7px 0">
            <Grid container spacing={2} display="flex" alignItems="center">
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
              <Grid item>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Loại án
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={type}
                    onChange={handleChange}
                    autoWidth
                    label="Loại án"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={21}>Twenty one</MenuItem>
                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
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

      <ConfirmModal
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        title="XÓA TẬP TIN"
        content={`${clinicDelete?.name ? clinicDelete.name : ""}`}
        type="DELETE"
        confirmFunc={handleDeleteClinic}
      />
      {openEditModal && (
        <ModalEditFile
          open={openEditModal}
          setOpen={setOpenEditModal}
          id={idFile}
        />
      )}
      {openViewModal && (
        <ModalViewFile
          open={openViewModal}
          setOpen={setOpenViewModal}
          id={idFile}
        />
      )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addfile);
