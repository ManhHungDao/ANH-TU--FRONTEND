import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  CardActionArea,
  CardActions,
  Box,
  CardHeader,
} from "@mui/material";
const ConfirmModal = ({
  open,
  setOpen,
  title,
  content,
  confirmFunc,
  cancelFunc,
  type,
  isShowTitle,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          {isShowTitle === false ? <></> : <CardHeader title={title} />}
          <CardContent>
            <Typography
              id="modal-modal-description"
              align={isShowTitle === false ? "none" : "center"}
            >
              {content}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "felx", justifyContent: "flex-end" }}>
            <Button
              color={type === "DELETE" ? "error" : "success"}
              variant="outlined"
              startIcon={type === "DELETE" ? <DeleteIcon /> : <CheckIcon />}
              onClick={confirmFunc}
            >
              {type === "DELETE" ? "Xóa" : "Xác nhận"}
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
};

export default ConfirmModal;
