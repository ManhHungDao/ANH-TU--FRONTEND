import React from "react";
import {
  Typography,
  Modal,
  Card,
  CardContent,
  Button,
  CardActions,
  CardHeader,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const ConfirmModal = ({
  open,
  setOpen,
  title = "Xác nhận hành động",
  content = "Bạn có chắc chắn muốn thực hiện thao tác này?",
  confirmFunc,
  type = "CONFIRM",
  isShowTitle = true,
}) => {
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

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Card sx={style}>
        {isShowTitle && <CardHeader title={title} />}
        <CardContent>
          <Typography
            id="modal-description"
            align={isShowTitle ? "center" : "left"}
          >
            {content}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            color={type === "DELETE" ? "error" : "primary"}
            variant="contained"
            startIcon={type === "DELETE" ? <DeleteIcon /> : <CheckIcon />}
            onClick={() => {
              confirmFunc();
              handleClose();
            }}
          >
            {type === "DELETE" ? "Xóa" : "Xác nhận"}
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;
