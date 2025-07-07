import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CKEditorFieldBasic from "../Ckeditor/CKEditorFieldBasic";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function ModalEditFile({ id, open, setOpen }) {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   if (id) {
  //     fetch(`http://localhost:8080/api/file/edit/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setContent(data.content);
  //       })
  //       .catch((error) => console.error("Error fetching file content:", error));
  //   }
  // }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = (e) => {
    fetch(`http://localhost:8080/api/file/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CKEditorFieldBasic
            value={content ? content : ""}
            onChange={setContent}
            // isError={errors.content ? true : false}
            // errorText={errors.content}
            title="Chỉnh sửa nội dung"
          />
          <Button
            sx={{ marginTop: "10px", display: "flex", alignSelf: "flex-end" }}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Lưu nội dung
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
