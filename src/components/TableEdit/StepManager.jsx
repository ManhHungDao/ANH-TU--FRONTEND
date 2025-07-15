import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import StepList from "./StepList";
import StepEditor from "./StepEditor";
import StepDialog from "./StepDialog";
import ConfirmDialog from "../common/ConfirmDialog";

const StepManager = ({ steps, onStepsChange }) => {
  const [selectedStepId, setSelectedStepId] = useState(steps[0]?.id || null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const [contentDraft, setContentDraft] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    const selected = steps.find((s) => s.id === selectedStepId);
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

  const requestDeleteStep = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDeleteStep = () => {
    const filtered = steps.filter((s) => s.id !== pendingDeleteId);
    onStepsChange(filtered);
    if (selectedStepId === pendingDeleteId) {
      const first = filtered[0];
      setSelectedStepId(first?.id || null);
      setContentDraft(first?.content || "");
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  const handleDialogSave = (title, id) => {
    if (id) {
      onStepsChange(steps.map((s) => (s.id === id ? { ...s, title } : s)));
    } else {
      const newStep = { id: Date.now(), title, content: "", files: [] };
      onStepsChange([...steps, newStep]);
      setSelectedStepId(newStep.id);
      setContentDraft("");
    }
    setDialogOpen(false);
  };

  const handleContentSave = () => {
    onStepsChange(
      steps.map((s) =>
        s.id === selectedStepId ? { ...s, content: contentDraft } : s
      )
    );
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    onStepsChange(
      steps.map((s) =>
        s.id === selectedStepId
          ? { ...s, files: [...(s.files || []), ...newFiles] }
          : s
      )
    );
  };

  const handleReorder = (reorderedSteps) => {
    onStepsChange(reorderedSteps);
  };

  return (
    <Box sx={{ display: "flex", height: "100%", p: 2 }}>
      <StepList
        steps={steps}
        selectedStepId={selectedStepId}
        onSelect={setSelectedStepId}
        onAdd={handleAddStep}
        onEdit={handleEditStep}
        onDelete={requestDeleteStep}
        onReorder={handleReorder}
      />
      <StepEditor
        step={steps.find((s) => s.id === selectedStepId)}
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
        steps={steps}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Xác nhận xóa bước"
        message="Bạn có chắc chắn muốn xóa bước này không?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={confirmDeleteStep}
      />
    </Box>
  );
};

export default StepManager;
