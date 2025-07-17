import React, { useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import StepList from "./StepList";
import StepEditor from "./StepEditor";
import StepDialog from "./StepDialog";
import * as api from "../../utils/api";

const StepManager = ({ steps, onStepsChange, location }) => {
  const [selectedStepId, setSelectedStepId] = useState(steps[0]?._id || null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const [contentDraft, setContentDraft] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const selected = steps.find((s) => s._id === selectedStepId);
    setContentDraft(selected?.content || "");
  }, [selectedStepId, steps]);

  const handleAddStep = () => {
    setEditStep(null);
    setDialogOpen(true);
  };

  const handleEditStep = (step) => {
    setEditStep(step);
    setDialogOpen(true);
  };

  const handleDeleteStep = async (id) => {
    try {
      await api.deleteStep(id);
      const filtered = steps.filter((s) => s._id !== id);
      onStepsChange(filtered);
      if (selectedStepId === id) {
        const first = filtered[0];
        setSelectedStepId(first?._id || null);
        setContentDraft(first?.content || "");
      }
      showSnackbar("Xoá bước thành công");
    } catch (err) {
      showSnackbar("Lỗi khi xoá bước", "error");
    }
  };

  const handleDialogSave = async (title, id) => {
    try {
      if (id) {
        await api.updateStep(id, { title });
        onStepsChange(steps.map((s) => (s._id === id ? { ...s, title } : s)));
        showSnackbar("Cập nhật bước thành công");
      } else {
        const newStep = await api.addStep(location, { title });
        onStepsChange([...steps, newStep]);
        setSelectedStepId(newStep._id);
        setContentDraft("");
        showSnackbar("Thêm bước mới thành công");
      }
      setDialogOpen(false);
    } catch (error) {
      showSnackbar("Lỗi khi lưu bước", "error");
    }
  };

  const handleContentSave = async () => {
    const step = steps.find((s) => s._id === selectedStepId);
    if (!step) return;

    try {
      await api.updateStep(selectedStepId, {
        title: step.title,
        content: contentDraft,
      });

      onStepsChange(
        steps.map((s) =>
          s._id === selectedStepId ? { ...s, content: contentDraft } : s
        )
      );
      showSnackbar("Lưu nội dung thành công");
    } catch (err) {
      showSnackbar("Lỗi khi lưu nội dung", "error");
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploaded = await api.uploadFiles(selectedStepId, files);
      onStepsChange(
        steps.map((s) =>
          s._id === selectedStepId
            ? { ...s, files: [...(s.files || []), ...uploaded] }
            : s
        )
      );
      showSnackbar("Tải tệp lên thành công");
    } catch (err) {
      showSnackbar("Tải tệp thất bại", "error");
    }
  };

  const handleReorder = async (newSteps) => {
    onStepsChange(newSteps);
    try {
      const ids = newSteps.map((s) => s._id);
      await api.reorderSteps(location, ids);
      showSnackbar("Cập nhật thứ tự thành công");
    } catch (err) {
      showSnackbar("Lỗi cập nhật thứ tự", "error");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%", p: 2 }}>
      <StepList
        steps={steps}
        selectedStepId={selectedStepId}
        onSelect={setSelectedStepId}
        onAdd={handleAddStep}
        onEdit={handleEditStep}
        onDelete={handleDeleteStep}
        onReorder={handleReorder}
        location={location}
      />
      <StepEditor
        step={steps.find((s) => s._id === selectedStepId)}
        content={contentDraft}
        onChangeContent={setContentDraft}
        onSaveContent={handleContentSave}
        onUploadFiles={handleFileUpload}
      />
      <StepDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleDialogSave}
        step={editStep}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StepManager;
