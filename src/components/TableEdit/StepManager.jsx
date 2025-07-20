import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import StepList from "./StepList";
import StepEditor from "./StepEditor";
import StepDialog from "./StepDialog";
import LoadingBackdrop from "../common/LoadingBackdrop";
import SnackbarAlert from "../common/SnackbarAlert";
import ConfirmDialog from "../common/ConfirmDialog"; // <- Thêm ConfirmDialog
import { api } from "../api/api";

const StepManager = ({ menuId }) => {
  const [steps, setSteps] = useState([]);
  const [selectedStepId, setSelectedStepId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editStep, setEditStep] = useState(null);
  const [contentDraft, setContentDraft] = useState("");

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Xác nhận xoá
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [stepToDelete, setStepToDelete] = useState(null);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const fetchSteps = async () => {
      setLoading(true);
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
        showSnackbar("Lỗi khi tải danh mục", "error");
      } finally {
        setLoading(false);
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
    setLoading(true);
    try {
      await api.updateStepContent(selectedStepId, contentDraft);
      const updatedSteps = await api.getSteps(menuId);
      setSteps(updatedSteps);

      const currentStep = updatedSteps.find((s) => s._id === selectedStepId);
      setContentDraft(currentStep?.content || "");

      showSnackbar("Cập nhật nội dung thành công.");
    } catch (error) {
      console.error("Lỗi khi cập nhật nội dung:", error);
      showSnackbar("Cập nhật nội dung thất bại", "error");
    } finally {
      setLoading(false);
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

  // Gọi khi bấm xoá -> mở dialog xác nhận
  const requestDeleteStep = (id) => {
    setStepToDelete(id);
    setConfirmDialogOpen(true);
  };

  // Thực hiện xoá thật sau khi xác nhận
  const confirmDeleteStep = async () => {
    if (!stepToDelete) return;

    setConfirmDialogOpen(false);
    setLoading(true);

    try {
      await api.deleteStep(stepToDelete);
      const filtered = steps.filter((s) => s._id !== stepToDelete);
      setSteps(filtered);

      if (selectedStepId === stepToDelete) {
        const first = filtered[0];
        setSelectedStepId(first?._id || null);
        setContentDraft(first?.content || "");
      }

      showSnackbar("Đã xoá danh mục.");
    } catch (error) {
      console.error("Lỗi xoá step:", error);
      showSnackbar("Xoá thất bại", "error");
    } finally {
      setLoading(false);
      setStepToDelete(null);
    }
  };

  const handleDialogSave = async (title, id, files = []) => {
    setLoading(true);
    if (id) {
      try {
        await api.updateStepTitle(id, title);
        setSteps(steps.map((s) => (s._id === id ? { ...s, title } : s)));
        showSnackbar("Đã cập nhật tên danh mục.");
      } catch (err) {
        console.error("Lỗi khi đổi tên step:", err);
        showSnackbar("Đổi tên thất bại", "error");
      }
    } else {
      try {
        const newStepData = { menu: menuId, title, content: "" };
        const createdStep = await api.createStep(newStepData, files);
        const newStep = {
          ...createdStep,
          files: createdStep.attachments || [],
        };

        const updatedSteps = [...steps, newStep];
        setSteps(updatedSteps);
        setSelectedStepId(newStep._id);
        setContentDraft("");
        showSnackbar("Đã tạo danh mục.");
      } catch (err) {
        console.error("Failed to create step:", err);
        showSnackbar("Tạo danh mục mới thất bại", "error");
      }
    }

    setLoading(false);
    setDialogOpen(false);
    setEditStep(null);
  };

  const handleFileUpload = async (files) => {
    setLoading(true);
    try {
      const result = await api.uploadFilesToStep(selectedStepId, files);
      const newFiles = result.attachments.map((f) => ({
        ...f,
        name: f.filename,
        url: `/api/steps/${selectedStepId}/attachments/${f._id}`,
      }));

      setSteps((prev) =>
        prev.map((s) =>
          s._id === selectedStepId
            ? { ...s, files: [...(s.files || []), ...newFiles] }
            : s
        )
      );
      showSnackbar("Tải tệp lên thành công.");
    } catch (err) {
      console.error("Upload file thất bại:", err);
      showSnackbar("Tải tệp thất bại", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    setLoading(true);
    try {
      await api.deleteFileFromStep(selectedStepId, fileId);
      setSteps((prev) =>
        prev.map((s) =>
          s._id === selectedStepId
            ? {
                ...s,
                files: (s.files || []).filter((f) => f._id !== fileId),
              }
            : s
        )
      );
      showSnackbar("Xoá file thành công.");
    } catch (err) {
      console.error("Xoá file thất bại:", err);
      showSnackbar("Xoá file thất bại", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleReorder = async (reorderedSteps) => {
    setSteps(reorderedSteps);
    try {
      const orderedIds = reorderedSteps.map((s) => s._id);
      await api.reorderSteps(menuId, orderedIds);
      showSnackbar("Đã thay đổi thứ tự.");
    } catch (err) {
      console.error("Lỗi khi sắp xếp lại:", err);
      showSnackbar("Sắp xếp thất bại", "error");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%", p: 2 }}>
      <StepList
        steps={steps}
        setSteps={setSteps}
        menuId={menuId}
        selectedStepId={selectedStepId}
        onSelect={setSelectedStepId}
        onAdd={handleAddStep}
        onEdit={handleEditStep}
        onDelete={requestDeleteStep} // <-- dùng hàm xác nhận xoá
        onReorder={handleReorder}
      />
      <StepEditor
        step={steps.find((s) => s._id === selectedStepId)}
        content={contentDraft}
        onChangeContent={setContentDraft}
        onSaveContent={handleContentSave}
        onUploadFiles={handleFileUpload}
        onDeleteFile={handleDeleteFile}
      />
      <StepDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditStep(null);
        }}
        onSave={handleDialogSave}
        step={editStep}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Xác nhận xoá"
        message="Bạn có chắc chắn muốn xoá danh mục này?"
        onCancel={() => {
          setConfirmDialogOpen(false);
          setStepToDelete(null);
        }}
        onConfirm={confirmDeleteStep}
      />
      <LoadingBackdrop open={loading} />
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default StepManager;
