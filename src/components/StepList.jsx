import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

import { updateStep, deleteStep } from "./api/stepApi";
import FileAttachments from "./FileAttachments";

export default function StepList({ steps, onStepUpdated, onStepDeleted }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const startEdit = (step) => {
    setEditingId(step._id);
    setEditTitle(step.title);
    setEditDesc(step.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDesc("");
  };

  const saveEdit = async (id) => {
    try {
      const res = await updateStep(id, {
        title: editTitle,
        description: editDesc,
      });
      onStepUpdated?.(res.data);
      cancelEdit();
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
    }
  };

  const confirmDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bước này?")) return;
    try {
      await deleteStep(id);
      onStepDeleted?.(id);
    } catch (err) {
      console.error("Lỗi khi xóa bước:", err);
    }
  };

  return (
    <>
      <List>
        {steps
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <ListItem
              key={step._id}
              alignItems="flex-start"
              secondaryAction={
                editingId === step._id ? (
                  <>
                    <Tooltip title="Lưu">
                      <IconButton edge="end" onClick={() => saveEdit(step._id)}>
                        <Save />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy">
                      <IconButton edge="end" onClick={cancelEdit}>
                        <Cancel />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Sửa">
                      <IconButton edge="end" onClick={() => startEdit(step)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        edge="end"
                        onClick={() => confirmDelete(step._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </>
                )
              }
            >
              {editingId === step._id ? (
                <Box width="100%">
                  <TextField
                    fullWidth
                    label="Tiêu đề"
                    variant="standard"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Mô tả"
                    variant="standard"
                    value={editDesc}
                    multiline
                    onChange={(e) => setEditDesc(e.target.value)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              ) : (
                <ListItemText
                  primary={step.title}
                  secondary={step.description}
                />
              )}
            </ListItem>
          ))}
      </List>
      {/* <FileAttachments stepId={step._id} /> */}
    </>
  );
}
