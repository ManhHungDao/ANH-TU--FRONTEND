import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { InsertDriveFile, Download } from "@mui/icons-material";
import { getAttachmentsByStep } from "./api/attachmentApi";

export default function FileAttachments({ stepId }) {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stepId) return;

    setLoading(true);
    getAttachmentsByStep(stepId)
      .then((res) => setAttachments(res.data))
      .catch((err) => console.error("Lỗi tải file:", err))
      .finally(() => setLoading(false));
  }, [stepId]);

  const getDownloadUrl = (attachment) => {
    return `http://localhost:5000/uploads/${attachment.path}`;
    // hoặc có thể là `/attachments/${attachment._id}/download` nếu có route riêng
  };

  if (loading) return <CircularProgress size={20} />;

  return attachments.length > 0 ? (
    <List dense>
      {attachments.map((file) => (
        <ListItem
          key={file._id}
          secondaryAction={
            <IconButton
              edge="end"
              component="a"
              href={getDownloadUrl(file)}
              download={file.filename}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download />
            </IconButton>
          }
        >
          <ListItemIcon>
            <InsertDriveFile />
          </ListItemIcon>
          <ListItemText
            primary={file.filename}
            secondary={`${(file.size / 1024).toFixed(1)} KB`}
          />
        </ListItem>
      ))}
    </List>
  ) : (
    <Typography variant="body2" color="text.secondary">
      Không có file đính kèm.
    </Typography>
  );
}
