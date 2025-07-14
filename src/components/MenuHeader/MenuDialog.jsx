// MenuDialog.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const MenuDialog = ({ open, level, type, target, onClose, onSubmit }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(type === "edit" && target ? target : "");
  }, [type, target]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {type === "add" ? "Thêm" : "Sửa"} menu cấp {level}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Tên menu"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuDialog;
