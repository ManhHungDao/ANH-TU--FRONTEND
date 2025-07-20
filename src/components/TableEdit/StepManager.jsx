import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import StepList from "./StepList";
import StepEditor from "./StepEditor";
import StepDialog from "./StepDialog";
import { api } from "../api/api";

const StepManager = ({ menuId }) => {
  const [steps, setSteps] = useState([]);
  console.log("🚀 ~ StepManager ~ steps:", steps);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const [contentDraft, setContentDraft] = useState("");

  // Load steps khi menuId thay đổi
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await api.getSteps(menuId);
        setSteps(res);
        if (res.length > 0) {
          setSelectedStepId(res[0]._id);
          setContentDraft(res[0].content || "");
        } else {
          setSelectedStepId(null);
          setContentDraft("");
        }
      } catch (err) {
        console.error("Lỗi khi load steps:", err);
      }
    };

    if (menuId) {
      fetchSteps();
    }
  }, [menuId]);

  // Khi thay đổi nội dung content
  const handleContentSave = () => {
    setSteps(
      steps.map((s) =>
        s._id === selectedStepId ? { ...s, content: contentDraft } : s
      )
    );
  };

  const handleAddStep = () => {
    setEditStep(null);
    setDialogOpen(true);
  };

  const handleEditStep = (step) => {
    setEditStep(step);
    setDialogOpen(true);
  };

  const handleDeleteStep = (id) => {
    const filtered = steps.filter((s) => s._id !== id);
    setSteps(filtered);
    if (selectedStepId === id) {
      const first = filtered[0];
      setSelectedStepId(first?._id || null);
      setContentDraft(first?.content || "");
    }
  };

  const handleDialogSave = async (title, id, files = []) => {
    if (id) {
      // Cập nhật tiêu đề local
      setSteps(steps.map((s) => (s._id === id ? { ...s, title } : s)));
    } else {
      // Tạo mới step
      const newStepData = {
        menu: menuId,
        title,
        content: "",
      };

      try {
        const createdStep = await api.createStep(newStepData, files);
        const newStep = {
          ...createdStep,
          files: createdStep.attachments || [],
        };

        const updatedSteps = [...steps, newStep];
        setSteps(updatedSteps);
        setSelectedStepId(newStep._id);
        setContentDraft("");
      } catch (err) {
        console.error("❌ Failed to create step:", err);
      }
    }

    setDialogOpen(false);
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setSteps(
      steps.map((s) =>
        s._id === selectedStepId
          ? { ...s, files: [...(s.files || []), ...newFiles] }
          : s
      )
    );
  };

  const handleReorder = (reorderedSteps) => {
    setSteps(reorderedSteps);
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
      {/* <StepEditor
        step={steps.find((s) => s._id === selectedStepId)}
        content={contentDraft}
        onChangeContent={setContentDraft}
        onSaveContent={handleContentSave}
        onUploadFiles={handleFileUpload}
      /> */}
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
