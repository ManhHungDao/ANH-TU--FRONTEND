import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const StepDialog = ({ open, onClose, onSave, step }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(step?.title || "");
    }
  }, [step, open]);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave(title, step?._id);
  };
  const handleClose = () => {
    onClose();
    setTitle("");
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{step ? "Sửa danh mục" : "Thêm danh mục"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Tên danh mục"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StepDialog;
