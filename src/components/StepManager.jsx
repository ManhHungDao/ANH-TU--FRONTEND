import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add, Edit, Delete, Save } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

const StepManager = ({ steps = [], onStepsChange = () => {} }) => {
  const [stepList, setStepList] = useState([]);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editStepTitle, setEditStepTitle] = useState("");
  const [editStepId, setEditStepId] = useState(null);
  const [contentDraft, setContentDraft] = useState("");

  useEffect(() => {
    setStepList(steps);
    if (steps.length > 0) {
      setSelectedStepId(steps[0].id);
      setContentDraft(steps[0].content);
    } else {
      setSelectedStepId(null);
      setContentDraft("");
    }
  }, [steps]);

  const selectedStep = stepList.find((s) => s.id === selectedStepId);

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
    const filtered = stepList.filter((s) => s.id !== id);
    setStepList(filtered);
    onStepsChange(filtered);
    if (selectedStepId === id && filtered.length > 0) {
      setSelectedStepId(filtered[0].id);
      setContentDraft(filtered[0].content);
    } else if (filtered.length === 0) {
      setSelectedStepId(null);
      setContentDraft("");
    }
  };

  const handleDialogSave = () => {
    if (!editStepTitle.trim()) return;

    let updated;
    if (editStepId) {
      updated = stepList.map((s) =>
        s.id === editStepId ? { ...s, title: editStepTitle } : s
      );
    } else {
      const newStep = {
        id: Date.now(),
        title: editStepTitle,
        content: "",
      };
      updated = [...stepList, newStep];
      setSelectedStepId(newStep.id);
      setContentDraft("");
    }

    setStepList(updated);
    onStepsChange(updated);
    setOpenDialog(false);
  };

  const handleSelectStep = (step) => {
    setSelectedStepId(step.id);
    setContentDraft(step.content);
  };

  const handleSaveContent = () => {
    const updated = stepList.map((s) =>
      s.id === selectedStepId ? { ...s, content: contentDraft } : s
    );
    setStepList(updated);
    onStepsChange(updated);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: 500,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      {/* Danh sách bước */}
      <Box sx={{ width: 300, pr: 2, borderRight: "1px solid #ccc" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Danh sách bước</Typography>
          <IconButton onClick={handleAddStep} color="primary">
            <Add />
          </IconButton>
        </Box>
        <List>
          {stepList.map((step) => (
            <ListItem
              key={step.id}
              selected={step.id === selectedStepId}
              onClick={() => handleSelectStep(step)}
              secondaryAction={
                <>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStep(step);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStep(step.id);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={step.title} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Nội dung markdown */}
      <Box sx={{ flex: 1, pl: 2, display: "flex", flexDirection: "column" }}>
        {selectedStep ? (
          <>
            <Typography variant="h6" gutterBottom>
              {selectedStep.title}
            </Typography>
            <TextField
              multiline
              label="Nội dung Markdown"
              rows={6}
              value={contentDraft}
              onChange={(e) => setContentDraft(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleSaveContent}
              startIcon={<Save />}
              sx={{ mb: 2 }}
            >
              Lưu nội dung
            </Button>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Xem trước:
            </Typography>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                backgroundColor: "#fafafa",
              }}
            >
              <ReactMarkdown>{contentDraft}</ReactMarkdown>
            </Box>
          </>
        ) : (
          <Typography>Chưa chọn bước nào</Typography>
        )}
      </Box>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editStepId ? "Sửa bước" : "Thêm bước"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên bước"
            value={editStepTitle}
            onChange={(e) => setEditStepTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleDialogSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StepManager;
