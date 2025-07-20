import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import mammoth from "mammoth";

const FileAttachments = ({ files, onUpload, onDelete }) => {
  const inputRef = useRef();
  const [previewFile, setPreviewFile] = useState(null);
  const [docxHtml, setDocxHtml] = useState("");

  useEffect(() => {
    if (
      previewFile?.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      fetch(previewFile.url)
        .then((res) => res.arrayBuffer())
        .then((buffer) =>
          mammoth.convertToHtml({ arrayBuffer: buffer }).then((result) => {
            setDocxHtml(result.value);
          })
        )
        .catch(() => setDocxHtml("<p>Lỗi khi xem file .docx</p>"));
    }
  }, [previewFile]);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(Array.from(e.target.files));
    }
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const renderPreviewContent = (file) => {
    if (!file?.mimetype) return <p>Không thể hiển thị file.</p>;

    // Image
    if (file.mimetype.startsWith("image/")) {
      return (
        <img
          src={file.url}
          alt={file.name}
          style={{ maxWidth: "100%", maxHeight: "70vh" }}
        />
      );
    }

    // PDF
    if (file.mimetype === "application/pdf") {
      return (
        <iframe
          src={file.url}
          title={file.name}
          style={{ width: "100%", height: "70vh", border: "none" }}
        />
      );
    }

    // DOCX Preview using mammoth
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return docxHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: docxHtml }}
          style={{
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        />
      ) : (
        <p>Đang tải nội dung file .docx...</p>
      );
    }

    return <p>Không hỗ trợ xem trước loại file này.</p>;
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          border: "1px dashed #ccc",
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          cursor: "pointer",
          "&:hover": { borderColor: "#90caf9" },
        }}
        onClick={() => inputRef.current?.click()}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <UploadFileIcon color="action" />
          <Typography variant="body2">Tải file hoặc kéo thả</Typography>
        </Stack>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Paper>

      {files?.length > 0 && (
        <Stack spacing={1} mt={2}>
          {files.map((file, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
                py: 1,
                borderRadius: 1,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            >
              <Typography
                variant="body2"
                noWrap
                sx={{ flex: 1, mr: 2 }}
                title={file.name}
              >
                📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </Typography>

              <Stack direction="row" spacing={0.5}>
                {/* View */}
                <Tooltip title="Xem">
                  <IconButton size="small" onClick={() => setPreviewFile(file)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                {/* Download */}
                <Tooltip title="Tải về">
                  <IconButton
                    size="small"
                    component="a"
                    href={file.url}
                    download={file.name}
                  >
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                {/* Delete */}
                <Tooltip title="Xóa">
                  <IconButton size="small" onClick={() => onDelete(file)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}

      {/* Preview Dialog */}
      <Dialog
        open={!!previewFile}
        onClose={handleClosePreview}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{previewFile?.name}</DialogTitle>
        <DialogContent dividers>
          {renderPreviewContent(previewFile)}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default FileAttachments;
