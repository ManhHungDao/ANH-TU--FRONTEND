import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const StepDialog = ({ open, onClose, onSave, step, steps }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(step?.title || "");
      setError("");
    }
  }, [step, open]);

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Tên bước không được để trống");
      return;
    }

    const isDuplicate = steps.some(
      (s) =>
        s.title.toLowerCase() === trimmed.toLowerCase() && s.id !== step?.id
    );

    if (isDuplicate) {
      setError("Tên bước đã tồn tại");
      return;
    }

    onSave(trimmed, step?.id);
    setTitle(""); // reset sau khi lưu
  };

  const handleClose = () => {
    setTitle("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{step ? "Sửa bước" : "Thêm bước"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Tên bước"
          value={title}
          error={Boolean(error)}
          helperText={error}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSave}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StepDialog;
