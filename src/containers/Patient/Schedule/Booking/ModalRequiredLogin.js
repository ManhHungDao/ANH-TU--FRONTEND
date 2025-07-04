import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
  outline: "none",
};

export default function ModalRequiredLogin({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông báo
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            Bạn cần đăng nhập để có thể đặt lịch khám
          </Typography>
          <span className="d-flex justify-content-end">
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
          </span>
        </Box>
      </Modal>
    </div>
  );
}
