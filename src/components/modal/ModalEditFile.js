import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";

// Style modal tách riêng để dễ tái sử dụng và chỉnh sửa
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  overflow: "auto",
};

export default function ModalEditFile({ id, open, setOpen }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch chi tiết file khi mở modal và có id
  useEffect(() => {
    if (!id || !open) return;

    const fetchFileDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/file/${id}`);
        const result = await response.json();

        setContent(result?.data?.content || "<p>Không có nội dung</p>");
      } catch (error) {
        console.error("Lỗi khi tải nội dung:", error);
        setContent("<p>Lỗi khi tải dữ liệu</p>");
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetail();
  }, [id, open]);

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/file/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      );

      const data = await response.json();
      console.log("Cập nhật thành công:", data);
      setOpen(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-edit-file-title"
      aria-describedby="modal-edit-file-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Chỉnh sửa nội dung tệp tin
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <CKEditorFieldBasic
            value={content}
            onChange={setContent}
            title="Chỉnh sửa nội dung"
          />
        )}

        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Lưu nội dung
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
