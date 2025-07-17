import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Save } from "@mui/icons-material";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";
import FileAttachments from "./FileAttachments";
import * as api from "../../utils/api";

const StepEditor = ({
  step,
  content,
  onChangeContent,
  onSaveContent,
  onFilesChange,
}) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    if (step?.files) {
      setAttachments(step.files);
    } else {
      setAttachments([]);
    }
  }, [step]);

  const handleUpload = async (files) => {
    if (!step?._id) return;
    try {
      const uploaded = await api.uploadFiles(step._id, files);
      const updated = [...(step.files || []), ...uploaded];
      setAttachments(updated);
      onFilesChange?.(updated);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDelete = async (fileToDelete) => {
    if (!step?._id || !fileToDelete._id) return;
    try {
      await api.deleteFile(step._id, fileToDelete._id);
      const updated = attachments.filter((f) => f._id !== fileToDelete._id);
      setAttachments(updated);
      onFilesChange?.(updated);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!step) return <Typography sx={{ pl: 4 }}>Chưa chọn bước nào</Typography>;

  return (
    <Box sx={{ flex: 1, pl: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        {step.title}
      </Typography>

      <CKEditorFieldBasic value={content} onChange={onChangeContent} />

      <Stack direction="row" spacing={2} alignItems="flex-start" mt={2}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={onSaveContent}
        >
          Lưu nội dung
        </Button>
        <Box sx={{ flex: 1 }}>
          <FileAttachments
            files={attachments}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default StepEditor;
