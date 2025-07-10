import { useState, useEffect } from "react";
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
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import { UploadCloud, X, Trash2 } from "lucide-react";
import axios from "axios";

const ModalAddFiles = ({ open, onClose }) => {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [showDeleteTypeModal, setShowDeleteTypeModal] = useState(false);
  const [selectedTypeToDelete, setSelectedTypeToDelete] = useState(null);

  useEffect(() => {
    if (open) {
      fetchTypes();
    }
  }, [open]);

  const fetchTypes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/types");
      setTypes(res.data.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy loại án:", err);
    }
  };

  const handleAddNewType = async () => {
    if (!newTypeName.trim()) {
      alert("Tên loại án không được để trống.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/type/add", {
        name: newTypeName.trim(),
      });

      const newType = res.data.data;
      setTypes([...types, newType]);
      setType(newType._id);
      setNewTypeName("");
      setShowAddTypeModal(false);
    } catch (err) {
      console.error("Lỗi khi thêm loại án:", err);
      alert("Thêm loại án thất bại.");
    }
  };
  console.log("🚀 ~ ModalAddFiles ~ types:", types);

  const handleDeleteType = async () => {
    if (!selectedTypeToDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/types/${selectedTypeToDelete}`
      );
      setTypes(types.filter((t) => t._id !== selectedTypeToDelete));
      if (type === selectedTypeToDelete) setType("");
      setShowDeleteTypeModal(false);
      setSelectedTypeToDelete(null);
    } catch (err) {
      console.error("Lỗi khi xóa loại án:", err);
      alert("Xóa loại án thất bại.");
    }
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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    selectedFiles = selectedFiles.map((file) => ({ ...file, type: type }));
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!files.length || !type) {
      alert("Vui lòng chọn loại án và tệp tin.");
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
    renamedFiles.forEach((file) => formData.append("files", file));

    try {
      await axios.post(
        "http://localhost:8080/api/files/upload-multiple",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Tải lên thành công!");
      setFiles([]);
      setType("");
      onClose();
    } catch (err) {
      console.error("Lỗi khi upload:", err);
      alert("Đã xảy ra lỗi khi tải lên.");
    }
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
      <Modal open={open} onClose={onClose}>
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
              onChange={(e) => setType(e.target.value)}
              label="Loại án"
            >
              <MenuItem value="">
                <em>Chọn loại án</em>
              </MenuItem>
              {types.map((t) => (
                <MenuItem key={t._id} value={t._id}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <span>{t.type}</span>
                    <Tooltip title="Xóa">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTypeToDelete(t._id);
                          setShowDeleteTypeModal(true);
                        }}
                      >
                        <Trash2 size={14} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem
                value="add-new"
                onClick={() => setShowAddTypeModal(true)}
              >
                + Thêm loại án mới
              </MenuItem>
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
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAddTypeModal(false)}
            >
              Hủy
            </Button>
            <Button variant="contained" onClick={handleAddNewType}>
              Lưu
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={showDeleteTypeModal}
        onClose={() => setShowDeleteTypeModal(false)}
      >
        <Box sx={{ ...style, width: 300 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Xác nhận xóa loại án
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Bạn có chắc chắn muốn xóa loại án này không?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setShowDeleteTypeModal(false)}
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteType}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddFiles;
