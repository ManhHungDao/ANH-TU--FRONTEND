import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

const StepEditor = ({ step, content, onChangeContent, onSaveContent }) => {
  if (!step) return <Typography sx={{ pl: 4 }}>Chưa chọn bước nào</Typography>;

  return (
    <Box sx={{ flex: 1, pl: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        {step.title}
      </Typography>
      <TextField
        label="Nội dung Markdown"
        multiline
        rows={8}
        value={content}
        onChange={(e) => onChangeContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={onSaveContent}
        sx={{ width: "fit-content", mb: 3 }}
      >
        Lưu nội dung
      </Button>
      <Typography variant="subtitle2" gutterBottom>
        Xem trước:
      </Typography>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ccc",
          borderRadius: 1,
          backgroundColor: "#fafafa",
          flex: 1,
          overflowY: "auto",
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default StepEditor;
