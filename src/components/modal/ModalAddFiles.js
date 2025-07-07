import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { UploadCloud, X } from "lucide-react";

const ModalAddFiles = ({ open, onClose, onSubmit }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onSubmit(files);
      setFiles([]);
      onClose();
    } else {
      alert("Please select at least one file.");
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    heigh: "120px",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 8,
    overflow: "auto",
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box sx={style}>
        <Typography variant="h6" className="mb-4 font-semibold text-xl">
          <UploadCloud className="inline-block mr-2" /> Tải tệp tin
        </Typography>

        <Button variant="outlined" component="label" className="w-full mb-3">
          Chọn tệp tin
          <input
            type="file"
            hidden
            multiple
            accept=".docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
        </Button>

        <List dense className="max-h-40 overflow-auto mb-3">
          {files.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Button onClick={() => handleRemoveFile(index)}>
                  <X size={16} />
                </Button>
              }
            >
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
          {files.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Chưa có tệp nào được chọn
            </Typography>
          )}
        </List>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Thoát
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Tải lên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddFiles;
