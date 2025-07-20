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
    setTitle(step?.title || "");
  }, [step]);

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
      <DialogTitle>{step ? "Sửa bước" : "Thêm bước"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Tên bước"
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
