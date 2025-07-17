import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add, Edit, Delete, DragIndicator } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as api from "../../utils/api"; // <-- đảm bảo có api.reorderSteps

const StepList = ({
  steps,
  selectedStepId,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
  location,
}) => {
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = [...steps];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    onReorder(reordered); // cập nhật UI

    try {
      const ids = reordered.map((s) => s._id);
      await api.reorderSteps(location, ids); // gọi API cập nhật thứ tự
    } catch (err) {
      console.error("Lỗi cập nhật thứ tự bước:", err);
    }
  };

  return (
    <Box sx={{ width: 300, borderRight: "1px solid #ccc", pr: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontWeight="bold">Danh mục</Typography>
        <IconButton size="small" onClick={onAdd}>
          <Add />
        </IconButton>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {steps.map((step, index) => (
                <Draggable key={step._id} draggableId={step._id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        px: 2,
                        py: 1.5,
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor:
                          step._id === selectedStepId ? "#e3f2fd" : "#fff",
                        border:
                          step._id === selectedStepId
                            ? "2px solid #1976d2"
                            : "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        "&:hover .actions": { visibility: "visible" },
                        cursor: "pointer",
                      }}
                      onClick={() => onSelect(step._id)}
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

                      <Box className="actions" sx={{ visibility: "hidden" }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(step);
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(step._id);
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
  );
};

export default StepList;
