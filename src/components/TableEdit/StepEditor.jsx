import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";

const StepEditor = ({
  step,
  content,
  onChangeContent,
  onSaveContent,
  onUploadFiles,
}) => {
  if (!step) return <Typography sx={{ pl: 4 }}>Chưa chọn bước nào</Typography>;

  return (
    <Box sx={{ flex: 1, pl: 4, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        {step.title}
      </Typography>

      {/* CKEditor */}

      <CKEditorFieldBasic value={content} onChange={onChangeContent} />
      <Button
        variant="contained"
        startIcon={<Save />}
        onClick={onSaveContent}
        sx={{ mt: 2, mb: 2, width: "fit-content" }}
      >
        Lưu nội dung
      </Button>

      {/* Upload file */}
      <Typography fontWeight="bold" gutterBottom>
        Đính kèm file
      </Typography>
      <input type="file" multiple onChange={onUploadFiles} />

      {/* Danh sách file đính kèm */}
      {step.files && step.files.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle2">
            Danh sách file đã đính kèm:
          </Typography>
          <List dense>
            {step.files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default StepEditor;
