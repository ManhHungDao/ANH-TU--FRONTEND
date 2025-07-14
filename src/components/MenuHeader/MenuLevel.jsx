// MenuLevel.jsx
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItemChip from "./MenuItemChip";

const MenuLevel = ({
  level,
  labels,
  selected,
  onSelect,
  onDelete,
  onEdit,
  onAdd,
}) => {
  return (
    <Box mb={2}>
      <Typography variant="subtitle1" fontWeight="bold">
        Menu cấp {level}
      </Typography>
      <Button onClick={onAdd} startIcon={<AddIcon />} sx={{ mt: 1 }}>
        Thêm menu cấp {level}
      </Button>
      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
        {labels.map((key) => (
          <MenuItemChip
            key={key}
            label={key}
            selected={selected === key}
            onClick={() => onSelect(key)}
            onDelete={() => onDelete(key)}
            onEdit={() => onEdit(key)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default MenuLevel;
