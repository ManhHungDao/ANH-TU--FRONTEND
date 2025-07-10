import React, { useState } from "react";
import {
  Typography,
  Modal,
  Card,
  CardContent,
  Button,
  CardActions,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ConfirmModal = ({
  open,
  setOpen,
  title = "Xác nhận xoá",
  content = "Bạn có chắc chắn muốn xoá tập tin này?",
  confirmFunc,
}) => {
  const [loading, setLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: "8px",
  };

  const handleClose = () => {
    if (!loading) setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await confirmFunc();
      setOpen(false);
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={style}>
        <CardHeader title={title} />
        <CardContent>
          <Typography align="center">{content}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <DeleteIcon />
              )
            }
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Đang xoá..." : "Xóa"}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;
