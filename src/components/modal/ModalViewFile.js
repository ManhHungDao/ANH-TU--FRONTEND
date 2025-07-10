import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  CircularProgress,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  borderRadius: 2,
};

export default function ModalViewFile({ id, open, setOpen }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id && open) {
      setLoading(true);
      fetch(`http://localhost:8080/api/file/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("🚀 ~ .then ~ data:", data.data.content);
          setContent(data?.data?.content || "<p>Không có nội dung</p>");
        })
        .catch(() => {
          setContent("<p>Lỗi khi tải dữ liệu</p>");
        })
        .finally(() => setLoading(false));
    }
  }, [id, open]);

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-view-file-title"
      aria-describedby="modal-view-file-description"
    >
      <Box sx={style}>
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
          <Box
            className="detail"
            dangerouslySetInnerHTML={{ __html: content }}
            sx={{ lineHeight: 1.8 }}
          />
        )}
      </Box>
    </Modal>
  );
}
