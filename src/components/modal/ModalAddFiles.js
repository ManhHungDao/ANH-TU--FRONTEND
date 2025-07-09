import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from "@mui/material";
import { UploadCloud, X } from "lucide-react";
import axios from "axios";

const ModalAddFiles = ({ open, onClose }) => {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("");
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [newType, setNewType] = useState("");

  const handleChange = (event) => {
    if (event.target.value === "add-new") {
      setShowAddTypeModal(true);
    } else {
      setType(event.target.value);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVietnameseTones = (str) => {
    if (!str) return "";
    return str
      .normalize("NFD")
      .replace(/\u0300-\u036f/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^0-9a-zA-Z\s.-]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const toSlug = (str) => {
    return removeVietnameseTones(str)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");
  };

  const handleSubmit = async () => {
    if (!files.length || (!type && !newType)) {
      alert("Phải có đầy đủ tập tin và phân loại");
      return;
    }

    const renamedFiles = files.map((file) => {
      const originalName = file.name;
      const extension = originalName.substring(originalName.lastIndexOf("."));
      const baseName = originalName.substring(0, originalName.lastIndexOf("."));
      const safeName = toSlug(baseName) + extension;

      return new File([file], safeName, { type: file.type });
    });

    const formData = new FormData();
    renamedFiles.forEach((file) => {
      formData.append("files", file);
    });

    const finalType = newType || type;
    formData.append("type", finalType);

    try {
      await axios.post(
        "http://localhost:8080/api/files/upload-multiple",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Upload thành công!");
      setFiles([]);
      setType("");
      setNewType("");
      setShowAddTypeModal(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi upload file");
    }
  };

  const handleCloseModal = () => {
    setFiles([]);
    setType("");
    setNewType("");
    setShowAddTypeModal(false);
    onClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
    overflowY: "auto",
  };

  return (
    <>
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            <UploadCloud style={{ verticalAlign: "middle", marginRight: 8 }} />
            Tải tệp tin
          </Typography>

          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Chọn tệp tin
            <input
              type="file"
              hidden
              multiple
              accept=".docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
          </Button>

          <List dense sx={{ maxHeight: 160, overflow: "auto", mb: 2 }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Button onClick={() => handleRemoveFile(index)} size="small">
                    <X size={16} />
                  </Button>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select-type-label">Loại án</InputLabel>
            <Select
              labelId="select-type-label"
              value={type}
              onChange={handleChange}
              label="Loại án"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Twenty">Twenty</MenuItem>
              <MenuItem value="TwentyOne">Twenty one</MenuItem>
              <MenuItem value="TwentyOneHalf">Twenty one and a half</MenuItem>
              <MenuItem value="add-new">+ Thêm loại án mới</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Tải lên
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={showAddTypeModal} onClose={() => setShowAddTypeModal(false)}>
        <Box sx={{ ...style, width: 300 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Thêm loại án mới
          </Typography>
          <TextField
            label="Tên loại án"
            variant="outlined"
            fullWidth
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAddTypeModal(false)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (newType) {
                  setType(newType);
                  setShowAddTypeModal(false);
                }
              }}
            >
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddFiles;
