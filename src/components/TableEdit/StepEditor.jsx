import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Save } from "@mui/icons-material";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";
import FileAttachments from "./FileAttachments";

const mockAttachments = [
  {
    name: "Tài liệu hướng dẫn.pdf",
    size: 243000,
    url: "#",
    type: "application/pdf",
  },
  {
    name: "bieu-mau.docx",
    size: 98000,
    url: "#",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
];

const StepEditor = ({
  step,
  content,
  onChangeContent,
  onSaveContent,
  onUploadFiles,
}) => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    // Giả lập: nếu step có file thật thì dùng, không thì dùng mock
    setAttachments(
      step?.attachments?.length ? step.attachments : mockAttachments
    );
  }, [step]);

  const handleUpload = (files) => {
    // Giả lập thêm file vào danh sách
    const newFiles = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: "#",
    }));
    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (fileToDelete) => {
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

      {/* Lưu & Upload file cùng hàng */}
      {/* <Stack direction="row" spacing={2} alignItems="center" mt={2}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={onSaveContent}
        >
          Lưu nội dung
        </Button>
        <Box flex={1}>
          <FileAttachments
            files={attachments}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        </Box>
      </Stack> */}
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
