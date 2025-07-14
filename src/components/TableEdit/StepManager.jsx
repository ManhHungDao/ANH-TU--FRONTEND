import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import StepList from "./StepList";
import StepEditor from "./StepEditor";
import StepDialog from "./StepDialog";

const StepManager = ({ steps, onStepsChange }) => {
  const [selectedStepId, setSelectedStepId] = useState(steps[0]?.id || null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const [contentDraft, setContentDraft] = useState("");

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

  const handleDeleteStep = (id) => {
    const filtered = steps.filter((s) => s.id !== id);
    onStepsChange(filtered);
    if (selectedStepId === id) {
      const first = filtered[0];
      setSelectedStepId(first?.id || null);
      setContentDraft(first?.content || "");
    }
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
        onDelete={handleDeleteStep}
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
      />
    </Box>
  );
};

export default StepManager;
