import { useEffect, useState } from "react";
import { Box, Button, Modal, Stack } from "@mui/material";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";

const modalStyle = {
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

export default function ModalEditFile({ id, open, setOpen }) {
  const [content, setContent] = useState("");

  // Uncomment this useEffect if you want to fetch content when the modal opens
  // useEffect(() => {
  //   if (id) {
  //     fetch(`http://localhost:8080/api/file/edit/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => setContent(data.content))
  //       .catch((error) => console.error("Error fetching file content:", error));
  //   }
  // }, [id]);

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    fetch(`http://localhost:8080/api/file/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File updated successfully:", data);
        setOpen(false);
      })
      .catch((error) => console.error("Error updating file:", error));
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <CKEditorFieldBasic
            value={content}
            onChange={setContent}
            title="Chỉnh sửa nội dung"
          />

          <Stack direction="row" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Lưu nội dung
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
