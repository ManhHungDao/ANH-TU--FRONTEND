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
import { Add, Edit, Delete, Save } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

const StepManager = () => {
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Bước 1",
      content: "## Nội dung Markdown\n- Ví dụ 1\n- Ví dụ 2",
    },
  ]);
  const [selectedStepId, setSelectedStepId] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [editStepTitle, setEditStepTitle] = useState("");
  const [editStepId, setEditStepId] = useState(null);
  const [contentDraft, setContentDraft] = useState("");

  const selectedStep = steps.find((s) => s.id === selectedStepId);

  // ====== Dialog xử lý tiêu đề bước ======
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
    setSteps(filtered);
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

    if (editStepId) {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === editStepId ? { ...s, title: editStepTitle } : s
        )
      );
    } else {
      const newStep = {
        id: Date.now(),
        title: editStepTitle,
        content: "",
      };
      setSteps((prev) => [...prev, newStep]);
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
    setSteps((prev) =>
      prev.map((s) =>
        s.id === selectedStepId ? { ...s, content: contentDraft } : s
      )
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", p: 2 }}>
      {/* ======= Left Menu: Danh sách bước ======= */}
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
              onClick={() => handleSelectStep(step)}
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

      {/* ======= Right Panel: Soạn nội dung Markdown ======= */}
      <Box sx={{ flex: 1, pl: 4, display: "flex", flexDirection: "column" }}>
        {selectedStep ? (
          <>
            <Typography variant="h5" gutterBottom>
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
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveContent}
              sx={{ mb: 3, width: "fit-content" }}
            >
              Lưu nội dung
            </Button>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              🔍 Xem trước Markdown:
            </Typography>
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                overflowY: "auto",
                backgroundColor: "#fafafa",
              }}
            >
              <ReactMarkdown>{contentDraft}</ReactMarkdown>
            </Box>
          </>
        ) : (
          <Typography variant="h6">Chưa chọn bước nào</Typography>
        )}
      </Box>

      {/* ======= Dialog thêm/sửa bước ======= */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editStepId ? "Sửa bước" : "Thêm bước"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên bước"
            fullWidth
            value={editStepTitle}
            onChange={(e) => setEditStepTitle(e.target.value)}
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
