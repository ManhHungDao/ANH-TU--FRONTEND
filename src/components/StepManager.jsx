import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add, Edit, Delete, Save, DragIndicator } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const StepManager = ({ steps, onStepsChange }) => {
  const [selectedStepId, setSelectedStepId] = useState(
    steps.length ? steps[0].id : null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [editStepTitle, setEditStepTitle] = useState("");
  const [editStepId, setEditStepId] = useState(null);
  const [contentDraft, setContentDraft] = useState(
    steps.find((s) => s.id === selectedStepId)?.content || ""
  );

  const handleAddStep = () => {
    setEditStepTitle("");
    setEditStepId(null);
    setOpenDialog(true);
  };

  const handleEditStep = (step) => {
    setEditStepTitle(step.title);
    setEditStepId(step.id);
    setOpenDialog(true);
  };

  const handleDeleteStep = (id) => {
    const filtered = steps.filter((s) => s.id !== id);
    onStepsChange(filtered);
    if (selectedStepId === id) {
      const first = filtered[0];
      setSelectedStepId(first?.id || null);
      setContentDraft(first?.content || "");
    }
  };

  const handleDialogSave = () => {
    if (!editStepTitle.trim()) return;
    if (editStepId) {
      onStepsChange(
        steps.map((s) =>
          s.id === editStepId ? { ...s, title: editStepTitle } : s
        )
      );
    } else {
      const newStep = {
        id: Date.now(),
        title: editStepTitle,
        content: "",
      };
      const updated = [...steps, newStep];
      onStepsChange(updated);
      setSelectedStepId(newStep.id);
      setContentDraft("");
    }
    setOpenDialog(false);
  };

  const handleSelectStep = (step) => {
    setSelectedStepId(step.id);
    setContentDraft(step.content);
  };

  const handleSaveContent = () => {
    onStepsChange(
      steps.map((s) =>
        s.id === selectedStepId ? { ...s, content: contentDraft } : s
      )
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...steps];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onStepsChange(reordered);
  };

  const selectedStep = steps.find((s) => s.id === selectedStepId);

  return (
    <Box sx={{ display: "flex", height: "100%", p: 2 }}>
      {" "}
      {/* height 100% để tránh double render */}
      {/* Left - Danh sách bước */}
      <Box sx={{ width: 300, borderRight: "1px solid #ccc", pr: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography fontWeight="bold">Danh sách bước</Typography>
          <IconButton size="small" onClick={handleAddStep}>
            <Add />
          </IconButton>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {steps.map((step, index) => (
                  <Draggable
                    key={step.id}
                    draggableId={step.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          position: "relative",
                          px: 2,
                          py: 1.5,
                          mb: 1,
                          borderRadius: 2,
                          backgroundColor:
                            step.id === selectedStepId ? "#e3f2fd" : "#fff",
                          border:
                            step.id === selectedStepId
                              ? "2px solid #1976d2"
                              : "1px solid #ddd",
                          boxShadow: step.id === selectedStepId ? 2 : 0,
                          transition: "all 0.2s",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          "&:hover .actions": {
                            visibility: "visible",
                          },
                        }}
                        onClick={() => handleSelectStep(step)}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box
                            {...provided.dragHandleProps}
                            sx={{ mr: 1, color: "gray" }}
                          >
                            <DragIndicator fontSize="small" />
                          </Box>
                          <Typography>{step.title}</Typography>
                        </Box>
                        <Box
                          className="actions"
                          sx={{
                            display: "flex",
                            gap: 0.5,
                            visibility: "hidden",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStep(step);
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStep(step.id);
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      {/* Right - Nội dung Markdown */}
      <Box sx={{ flex: 1, pl: 4, display: "flex", flexDirection: "column" }}>
        {selectedStep ? (
          <>
            <Typography variant="h6" gutterBottom>
              {selectedStep.title}
            </Typography>
            <TextField
              label="Nội dung Markdown"
              multiline
              rows={8}
              value={contentDraft}
              onChange={(e) => setContentDraft(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveContent}
              sx={{ width: "fit-content", mb: 3 }}
            >
              Lưu nội dung
            </Button>
            <Typography variant="subtitle2" gutterBottom>
              Xem trước:
            </Typography>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                backgroundColor: "#fafafa",
                height: "100%",
                overflowY: "auto",
              }}
            >
              <ReactMarkdown>{contentDraft}</ReactMarkdown>
            </Box>
          </>
        ) : (
          <Typography>Chưa chọn bước nào</Typography>
        )}
      </Box>
      {/* Dialog thêm/sửa bước */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editStepId ? "Sửa bước" : "Thêm bước"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Tên bước"
            fullWidth
            value={editStepTitle}
            onChange={(e) => setEditStepTitle(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleDialogSave}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StepManager;
