import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

import { createStep } from "./api/stepApi";
import { uploadAttachment } from "./api/attachmentApi";

export default function StepDialog({
  open,
  onClose,
  infoBoardId,
  onStepAdded,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      // 1. Tạo Step
      const res = await createStep({
        infoBoard: infoBoardId,
        title,
        description,
        order: Date.now(), // có thể dùng logic khác để order
      });
      const newStep = res.data;

      // 2. Upload từng file (nếu có)
      for (const file of files) {
        await uploadAttachment(newStep._id, file);
      }

      // 3. Gửi step mới lên cha & reset form
      onStepAdded(newStep);
      handleClose();
    } catch (err) {
      console.error("Lỗi khi thêm bước:", err);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setFiles([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm bước mới</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Tiêu đề"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Mô tả"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box mt={2}>
          <Button component="label" variant="outlined">
            Chọn file đính kèm
            <input type="file" hidden multiple onChange={handleFileChange} />
          </Button>
          {files.length > 0 && (
            <Typography variant="body2" mt={1}>
              {files.length} file đã chọn
            </Typography>
          )}
        </Box>
        {loading && <LinearProgress sx={{ mt: 2 }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
