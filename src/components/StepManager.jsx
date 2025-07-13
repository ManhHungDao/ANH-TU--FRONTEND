import React, { useState } from "react";
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
import { Add, Edit, Delete } from "@mui/icons-material";

const StepManager = () => {
  const [steps, setSteps] = useState([
    { id: 1, title: "Bước 1", content: "Nội dung bước 1" },
  ]);
  const [selectedStepId, setSelectedStepId] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editStep, setEditStep] = useState(null);

  const handleAddStep = () => {
    setEditStep({ id: null, title: "", content: "" });
    setOpenDialog(true);
  };

  const handleEditStep = (step) => {
    setEditStep(step);
    setOpenDialog(true);
  };

  const handleDeleteStep = (id) => {
    const filtered = steps.filter((s) => s.id !== id);
    setSteps(filtered);
    if (selectedStepId === id && filtered.length > 0) {
      setSelectedStepId(filtered[0].id);
    } else if (filtered.length === 0) {
      setSelectedStepId(null);
    }
  };

  const handleDialogSave = () => {
    if (!editStep.title.trim()) return;

    if (editStep.id) {
      // Update
      setSteps((prev) =>
        prev.map((s) => (s.id === editStep.id ? editStep : s))
      );
    } else {
      // Add new
      const newStep = {
        ...editStep,
        id: Date.now(),
      };
      setSteps((prev) => [...prev, newStep]);
      setSelectedStepId(newStep.id);
    }
    setOpenDialog(false);
  };

  const selectedStep = steps.find((s) => s.id === selectedStepId);

  return (
    <Box sx={{ display: "flex", height: "100vh", p: 2 }}>
      {/* Left: Menu */}
      <Box sx={{ width: 300, borderRight: "1px solid #ccc", pr: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Danh sách bước</Typography>
          <IconButton onClick={handleAddStep} color="primary">
            <Add />
          </IconButton>
        </Box>
        <List>
          {steps.map((step) => (
            <ListItem
              key={step.id}
              selected={step.id === selectedStepId}
              onClick={() => setSelectedStepId(step.id)}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStep(step);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    edge="end"
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

      {/* Right: Step Content */}
      <Box sx={{ flex: 1, pl: 4 }}>
        {selectedStep ? (
          <>
            <Typography variant="h5" gutterBottom>
              {selectedStep.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography>{selectedStep.content}</Typography>
          </>
        ) : (
          <Typography variant="h6">Chưa chọn bước nào</Typography>
        )}
      </Box>

      {/* Dialog: Add/Edit */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editStep?.id ? "Sửa bước" : "Thêm bước"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tiêu đề bước"
            fullWidth
            value={editStep?.title || ""}
            onChange={(e) =>
              setEditStep({ ...editStep, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Nội dung"
            fullWidth
            multiline
            rows={4}
            value={editStep?.content || ""}
            onChange={(e) =>
              setEditStep({ ...editStep, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleDialogSave} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StepManager;
