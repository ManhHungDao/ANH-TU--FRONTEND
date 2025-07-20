import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title || "Xác nhận xoá"}</DialogTitle>
      <DialogContent>
        <Typography>
          {message || "Bạn có chắc chắn muốn xoá mục này?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Huỷ
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
