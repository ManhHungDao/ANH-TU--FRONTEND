import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import StepList from "./StepList";
import StepEditor from "./StepEditor";
import StepDialog from "./StepDialog";
import { api } from "../api/api";

const StepManager = ({ menuId }) => {
  const [steps, setSteps] = useState([]);
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
  useEffect(() => {
    if (selectedStepId) {
      const step = steps.find((s) => s._id === selectedStepId);
      setContentDraft(step?.content || "");
    }
  }, [selectedStepId, steps]);

  const handleContentSave = async () => {
    try {
      await api.updateStepContent(selectedStepId, contentDraft);

      // Tải lại dữ liệu từ server để đồng bộ hoàn toàn
      const updatedSteps = await api.getSteps(menuId);
      setSteps(updatedSteps);

      // Tìm lại step đang chọn và cập nhật contentDraft
      const currentStep = updatedSteps.find((s) => s._id === selectedStepId);
      setContentDraft(currentStep?.content || "");

      console.log("✅ Cập nhật content thành công.");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật nội dung:", error);
    }
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
      try {
        // Gọi API cập nhật title
        await api.updateStepTitle(id, title);

        // Cập nhật local state
        setSteps(steps.map((s) => (s._id === id ? { ...s, title } : s)));
      } catch (err) {
        console.error(
          "❌ Lỗi khi đổi tên step:",
          err.response?.data?.error || err.message
        );
      }
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
    setEditStep(null);
  };

  const handleFileUpload = async (files) => {
    try {
      const uploaded = await api.uploadFilesToStep(selectedStepId, files);

      setSteps((prev) =>
        prev.map((s) =>
          s._id === selectedStepId
            ? { ...s, files: [...(s.files || []), ...uploaded] }
            : s
        )
      );
    } catch (err) {
      console.error("❌ Upload file thất bại:", err);
    }
  };

  const handleReorder = (reorderedSteps) => {
    setSteps(reorderedSteps);
  };
  const handleDeleteFile = async (fileId) => {
    try {
      await api.deleteFileFromStep(selectedStepId, fileId);
      setSteps((prev) =>
        prev.map((s) =>
          s._id === selectedStepId
            ? {
                ...s,
                attachments: s.attachments.filter((f) => f._id !== fileId),
              }
            : s
        )
      );
    } catch (err) {
      console.error("❌ Xoá file thất bại:", err);
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
        onClose={() => {
          setDialogOpen(false);
          setEditStep(null); // reset luôn cả khi bấm "Hủy"
        }}
        onSave={handleDialogSave}
        step={editStep}
      />
    </Box>
  );
};

export default StepManager;
