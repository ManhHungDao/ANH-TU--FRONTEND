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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const ModalAddFiles = ({ open, onClose, onSubmit }) => {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState("");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length <= 0 || type === "") {
      alert("Phải có đầy đủ tập tin và phân loại");
    } else {
      onSubmit(files);
      setFiles([]);
    }
  };
  const handleCloseModal = () => {
    setFiles([]);
    setType("");
    onClose();
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box sx={style}>
        <Typography variant="h6" className=" font-semibold text-xl">
          <UploadCloud className="inline-block mr-2" /> Tải tệp tin
        </Typography>

        <Button variant="outlined" component="label" className="w-full">
          Chọn tệp tin
          <input
            type="file"
            hidden
            multiple
            accept=".docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
        </Button>

        <List dense className="max-h-40 overflow-auto ">
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
        </List>
        <FormControl
          sx={{
            minWidth: 120,
            mb: 3,
          }}
        >
          <InputLabel id="demo-simple-select-autowidth-label">
            Loại án
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={type}
            onChange={handleChange}
            autoWidth
            label="Loại án"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={21}>Twenty one</MenuItem>
            <MenuItem value={22}>Twenty one and a half</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Tải lên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddFiles;
