// src/components/MenuItemChip.jsx
import React from "react";
import { Box, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const MenuItemChip = ({
  label,
  selected = false,
  onClick,
  onDelete,
  onEdit,
}) => {
  return (
    <Chip
      label={
        <Box display="flex" alignItems="center">
          {label}
          {onEdit && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              sx={{
                ml: 0.5,
                p: 0.5,
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      }
      onClick={onClick}
      onDelete={onDelete}
      color={selected ? "primary" : "default"}
      variant="outlined"
      sx={{
        borderRadius: 2,
        fontWeight: 500,
        backgroundColor: selected ? "primary.light" : "white",
        "& .MuiChip-deleteIcon": {
          fontSize: 18,
        },
      }}
    />
  );
};

export default MenuItemChip;
