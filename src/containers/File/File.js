import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../../components/Header";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import ModalEditFile from "../../components/modal/ModalEditFile";
import ModalViewFile from "../../components/modal/ModalViewFile";
import Image from "../../assets/word.png";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import {
  Box,
  Grid,
  Paper,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TablePagination,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Cached as CachedIcon,
  RemoveRedEyeRounded as ViewIcon,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ddd",
    color: "#000",
    fontWeight: "bold",
    fontSize: "14px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "13px",
  },
}));

const TableHeader = () => (
  <TableRow>
    <StyledTableCell>Tên file</StyledTableCell>
    <StyledTableCell>Loại án</StyledTableCell>
    <StyledTableCell align="center">Hành động</StyledTableCell>
  </TableRow>
);

const TableRowItem = ({ file, onAction }) => (
  <TableRow>
    <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <img
          src={file.logo}
          alt={file.name}
          style={{ width: 20, height: 20 }}
        />
        {file.name}
      </Box>
    </TableCell>
    <TableCell>{file.address?.detail || ""}</TableCell>
    <TableCell align="center">
      <Tooltip title="Tải xuống">
        <IconButton onClick={() => onAction(file, "Download")}>
          <ArrowCircleDownIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sửa">
        <IconButton onClick={() => onAction(file, "Edit")}>
          <ViewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton onClick={() => onAction(file, "Delete")}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
);

const Addfile = ({ isSuccess, clearStatus }) => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalFiles, setTotalFiles] = useState(0);
  const [idFile, setIdFile] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const fetchFiles = useCallback(
    async (pageNum = page, size = rowsPerPage, filter = search) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/files`, {
          params: { page: pageNum, size, filter },
        });
        const mappedFiles =
          response.data?.data?.map((file) => ({
            id: file._id,
            name: file.filename,
            logo: Image,
            content: file.content,
          })) || [];
        setFiles(mappedFiles);
        setTotalFiles(response.data?.pagination?.totalItems || 0);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách file:", error);
        setFiles([]);
      }
    },
    [page, rowsPerPage, search] // 👉 thêm dependencies
  );

  useEffect(() => {
    fetchFiles(1, rowsPerPage);
  }, [fetchFiles, rowsPerPage]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);

  const handleSearch = () => {
    setPage(0);
    fetchFiles(1, rowsPerPage, search);
  };

  const handleReset = () => {
    const resetSearch = "";
    const resetPage = 0;
    const resetRows = 10;

    setSearch(resetSearch);
    setType("");
    setPage(resetPage);
    setRowsPerPage(resetRows);

    fetchFiles(1, resetRows, resetSearch);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleActionClick = (file, actionType) => {
    setIdFile(file.id);
    if (actionType === "View") setOpenViewModal(true);
    if (actionType === "Edit") setOpenEditModal(true);
    if (actionType === "Delete") setOpenConfirmModal(true);
  };

  const handleDeleteFile = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/files/${idFile}`); // 👉 Gọi API xóa
      fetchFiles(page, rowsPerPage, search); // 👉 Refresh danh sách sau khi xóa
      setOpenConfirmModal(false); // 👉 Đóng modal xác nhận
    } catch (error) {
      console.error("Lỗi khi xóa file:", error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Box m={3}>
      <Header
        title="Quản lý danh sách tập tin"
        subtitle="Quản lý tệp tin"
        titleBtn="Thêm file"
        open={openAddModal}
        setOpen={setOpenAddModal}
      />

      <Grid container spacing={2} alignItems="center" my={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              placeholder="Lọc theo tên"
              value={search}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Loại án</InputLabel>
            <Select value={type} onChange={handleTypeChange} label="Loại án">
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
            <IconButton onClick={handleReset}>
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableHeader />
          </TableHead>
          <TableBody>
            {files.length > 0 ? (
              files.map((file) => (
                <TableRowItem
                  key={file.id}
                  file={file}
                  onAction={handleActionClick}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalFiles > 0 ? totalFiles : files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table__clinic--pagination"
        labelRowsPerPage="Cột trong trang:"
        sx={{
          "& .MuiTablePagination-toolbar": {
            minHeight: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          },
          "& .MuiTablePagination-selectLabel": {
            margin: 0, // Xoá khoảng cách dư
          },
          "& .MuiTablePagination-select": {
            marginRight: "8px", // Khoảng cách dropdown
          },
          "& .MuiTablePagination-displayedRows": {
            margin: 0,
          },
          "& .MuiTablePagination-actions": {
            marginLeft: "8px",
          },
        }}
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
      {openConfirmModal && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xác nhận xoá tập tin"
          content="Bạn có chắc chắn muốn xoá tập tin này không?"
          confirmFunc={handleDeleteFile}
          type="DELETE"
        />
      )}
      {/* ConfirmModal có thể mở lại nếu cần */}
    </Box>
  );
};

export default Addfile;
