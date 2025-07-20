import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Save } from "@mui/icons-material";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";
import FileAttachments from "./FileAttachments";

const StepEditor = ({
  step,
  content,
  onChangeContent,
  onSaveContent,
  onUploadFiles,
}) => {
  console.log("🚀 ~ content:", content);
  console.log("🚀 ~ step:", step);
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    // Luôn dùng file thật từ step
    setAttachments(step?.files || []);
  }, [step]);
  useEffect(() => {
    // Luôn dùng file thật từ step
    setAttachments(step?.files || []);
  }, [step]);

  const handleUpload = (files) => {
    if (!step?._id) return;
    onUploadFiles(files); // gọi hàm upload từ StepManager
  };

  const handleDelete = (fileToDelete) => {
    // TODO: Gọi API xoá file nếu cần
    setAttachments((prev) => prev.filter((f) => f.name !== fileToDelete.name));
  };

  if (!step) return <Typography sx={{ pl: 4 }}>Chưa chọn bước nào</Typography>;

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
