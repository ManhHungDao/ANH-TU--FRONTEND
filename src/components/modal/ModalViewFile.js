import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

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
};

export default function ModalViewFile({ id, open, setOpen }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/file/view/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setContent(data.content);
        })
        .catch((error) => console.error("Error fetching file content:", error));
    }
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {content && (
            <>
              <span
                className="detail"
                dangerouslySetInnerHTML={{
                  __html: content ? content : "Tải thông tin lỗi",
                }}
              ></span>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
