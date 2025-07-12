import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "../../components/Header";
import ConfirmModal from "../../components/confirmModal/ConfirmModal";
import ModalEditFile from "../../components/modal/ModalEditFile";
import ModalViewFile from "../../components/modal/ModalViewFile";
import Image from "../../assets/word.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

import Filters from "../../components/Filters";
import TableHeader from "../../components/FileTable/TableHeader";
import TableRowItem from "../../components/FileTable/TableRowItem";
import Pagination from "../../components/Pagination";

const File = () => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalFiles, setTotalFiles] = useState(0);
  const [idFile, setIdFile] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [types, setTypes] = useState([]);
  const [menuItems, setMenuItems] = useState(["Trang chủ"]);

  const fetchTypes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/types");
      setTypes(res.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy loại án:", err);
    }
  };

  const fetchFiles = useCallback(async () => {
    try {
      const params = {
        page: page + 1,
        size: rowsPerPage,
        ...(search.trim() && { filter: search.trim() }),
        ...(type && { type }),
      };

      const response = await axios.get(`http://localhost:8080/api/files`, {
        params,
      });

      const mappedFiles =
        response.data?.data?.map((file) => ({
          id: file._id,
          name: file.filename,
          type: file.type,
          logo: Image,
          content: file.content,
          address: file.address,
        })) || [];

      setFiles(mappedFiles);
      setTotalFiles(response.data?.pagination?.totalItems || 0);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách file:", error);
      setFiles([]);
    }
  }, [page, rowsPerPage, search, type]);

  useEffect(() => {
    fetchFiles();
    fetchTypes();
  }, [fetchFiles]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(0);
  };

  const handleSearch = () => setPage(0);
  const handleReset = () => {
    setSearch("");
    setType("");
    setPage(0);
    setRowsPerPage(10);
    fetchTypes();
    fetchFiles();
  };
  const handleKeyPress = (e) => e.key === "Enter" && handleSearch();

  const handleActionClick = (file, actionType) => {
    setIdFile(file.id);
    if (actionType === "View") setOpenViewModal(true);
    if (actionType === "Edit") setOpenEditModal(true);
    if (actionType === "Delete") setOpenConfirmModal(true);
    if (actionType === "Download") handleDownload(file.id, file.name);
  };

  const handleDeleteFile = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/file/${idFile}`);
      fetchFiles();
      setOpenConfirmModal(false);
    } catch (error) {
      console.error("Lỗi khi xóa file:", error);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownload = async (id, filename) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/file/download/${id}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${filename || "download"}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Lỗi khi tải file:", error);
    }
  };

  return (
    <Box m={3}>
      <Header menuItems={menuItems} setMenuItems={setMenuItems} />

      <Filters
        search={search}
        type={type}
        types={types}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onSearch={handleSearch}
        onReset={handleReset}
        onKeyPress={handleKeyPress}
      />

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

      <Pagination
        count={totalFiles > 0 ? totalFiles : files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
        />
      )}
    </Box>
  );
};

export default File;
