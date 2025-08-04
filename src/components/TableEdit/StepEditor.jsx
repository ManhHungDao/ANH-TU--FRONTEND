import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Save } from "@mui/icons-material";
import FileAttachments from "./FileAttachments";
import { api } from "../api/api";
import CKEditorFieldBasic from "../CKEditorFieldBasic";

const StepEditor = ({
  step,
  content,
  onChangeContent,
  onSaveContent,
  onUploadFiles,
  onDeleteFile,
}) => {
  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    const fetchAttachments = async () => {
      if (step?._id) {
        try {
          const files = await api.getStepAttachments(step._id);
          setAttachments(files);
        } catch (err) {
          console.error("Lỗi khi tải file đính kèm:", err);
        }
      } else {
        setAttachments([]);
      }
    };

    fetchAttachments();
  }, [step]);

  const handleUpload = (files) => {
    if (!step?._id) return;
    onUploadFiles(files); // gọi hàm upload từ StepManager
  };

  const handleDelete = (fileToDelete) => {
    if (!step?._id || !fileToDelete?._id) return;
    onDeleteFile(fileToDelete._id);
  };

  if (!step) return <Typography sx={{ pl: 4 }}>Chưa chọn mục</Typography>;

  return (
    <Box sx={{ flex: 1, pl: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        {step.title}
      </Typography>

      {/* CKEditor */}
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
