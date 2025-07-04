import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";

import {
  Grid,
  Typography,
  Divider,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonComponent from "../../../../components/ButtonComponent";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import _ from "lodash";
import { scopes } from "../../../../utils";
import PermissionsGate from "../../../../hoc/PermissionsGate";
const FormData = ({
  data,
  type,
  page,
  title,
  updateAllCodeAction,
  deleteAllCodeAction,
  createAllCodeAction,
  openConfirmModal,
  setOpenConfirmModal,
  valueVI,
  setValueVI,
  valueEN,
  setValueEN,
  isEdit,
  setIsEdit,
  rowsPerPage,
  handleChangeRowsPerPage,
  handleChangePage,
  count,
}) => {
  const [editCode, setEditCode] = useState("");
  const [deleteCode, setDeleteCode] = useState("");
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#ddd",
      color: "black",
    },
  }));
  useEffect(() => {
    if (type) {
      setEditCode("");
      setDeleteCode("");
    }
  }, [type]);
  const hadnleClickEdit = (props) => {
    setIsEdit(true);
    setEditCode(props);
    setValueEN(props?.valueEN ? props?.valueEN : "");
    setValueVI(props?.valueVI ? props?.valueVI : "");
  };
  const handelClickDelete = (props) => {
    setDeleteCode(props);
    setOpenConfirmModal(true);
  };
  const handleDeleteCode = () => {
    const id = deleteCode?._id ? deleteCode?._id : null;
    if (id) deleteAllCodeAction(id);
  };

  const handleSave = () => {
    if (!valueEN && !valueVI) {
      toast.error("Tên đang trống");
      return;
    }
    const data = {
      valueEN: valueEN ? valueEN : null,
      valueVI: valueVI ? valueVI : null,
      type: type ? type : null,
    };
    if (isEdit === true) {
      updateAllCodeAction(editCode._id, data);
    } else {
      createAllCodeAction(data);
    }
  };
  const handleClickRenew = () => {
    setValueVI("");
    setValueEN("");
    setEditCode({});
    setIsEdit(false);
  };

  const TableRowName = () => (
    <TableRow className="table__clinic--header">
      <StyledTableCell>Loại</StyledTableCell>
      <StyledTableCell>Giá trị</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </TableRow>
  );
  const TableColumn = (props) => {
    const { id, valueVI, type } = props;
    return (
      <TableRow>
        <TableCell>{type ? type : "-"}</TableCell>
        <TableCell>{valueVI ? valueVI : "-"}</TableCell>
        <TableCell>
          <PermissionsGate scopes={[scopes.CODE_UPDATE]}>
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => hadnleClickEdit(props)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </PermissionsGate>
          <PermissionsGate scopes={[scopes.CODE_DELETE]}>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handelClickDelete(props)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </PermissionsGate>
        </TableCell>
      </TableRow>
    );
  };
  return (
    <>
      <Typography variant="h5">
        {title}
        <Tooltip title="Làm mới">
          <IconButton onClick={handleClickRenew}>
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Typography>
      <Divider />
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                required
                id="outlined-required"
                label="Tên tiếng việt"
                fullWidth
                onChange={(e) => setValueVI(e.target.value)}
                value={valueVI}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="outlined-required"
                label="Loại"
                fullWidth
                onChange={(e) => setValueEN(e.target.value)}
                value={type}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
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
                  data.map((e) => <TableColumn key={e.id} {...e} />)}
              </TableBody>
            </Table>
          </TableContainer>
          {data && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={parseInt(count ? count : 0)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="table__user--pagination"
            />
          )}
        </Grid>
        <PermissionsGate scopes={[scopes.CODE_ADD]}>
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
        </PermissionsGate>
      </Grid>
      {deleteCode && (
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title="Xóa code"
          content={`${deleteCode?.valueVI ? deleteCode.valueVI : ""}`}
          type="DELETE"
          confirmFunc={handleDeleteCode}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAllCodeAction: (data) => dispatch(actions.createAllCodeAction(data)),
    updateAllCodeAction: (id, data) =>
      dispatch(actions.updateAllCodeAction(id, data)),
    deleteAllCodeAction: (id) => dispatch(actions.deleteAllCodeAction(id)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormData);
