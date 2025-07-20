// components/MenuDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { api } from "./api/api";

const MenuDialog = ({
  open,
  onClose,
  config,
  menuData,
  setMenuData,
  selected,
  setSelected,
}) => {
  const [value, setValue] = useState(config.value || "");

  useEffect(() => {
    setValue(config.value || "");
  }, [config]);

  const handleSave = async () => {
    const title = value.trim();
    if (!title) return;

    const { type, level, target } = config;

    try {
      if (type === "edit") {
        let id = null;
        if (level === "level1") id = menuData[target]?._id;
        if (level === "level2")
          id = menuData[selected.selectedLevel1]?.[target]?._id;
        if (level === "level3")
          id =
            menuData[selected.selectedLevel1]?.[selected.selectedLevel2]?.[
              target
            ]?._id;
        if (!id) throw new Error("Không tìm thấy menu để sửa");

        await api.updateMenuTitle(id, title);

        setMenuData((prev) => {
          const updated = { ...prev };

          if (level === "level1") {
            updated[title] = updated[target];
            delete updated[target];
            if (selected.selectedLevel1 === target)
              setSelected.setSelectedLevel1(title);
          }

          if (level === "level2") {
            updated[selected.selectedLevel1][title] =
              updated[selected.selectedLevel1][target];
            delete updated[selected.selectedLevel1][target];
            if (selected.selectedLevel2 === target)
              setSelected.setSelectedLevel2(title);
          }

          if (level === "level3") {
            updated[selected.selectedLevel1][selected.selectedLevel2][title] =
              updated[selected.selectedLevel1][selected.selectedLevel2][target];
            delete updated[selected.selectedLevel1][selected.selectedLevel2][
              target
            ];
            if (selected.selectedLevel3 === target)
              setSelected.setSelectedLevel3(title);
          }

          return updated;
        });
      } else {
        // Add
        let parentId = null;
        if (level === "level2")
          parentId = menuData[selected.selectedLevel1]?._id;
        if (level === "level3")
          parentId =
            menuData[selected.selectedLevel1]?.[selected.selectedLevel2]?._id;

        const newMenu = await api.createMenu({ title, parent: parentId });

        setMenuData((prev) => {
          const updated = { ...prev };
          if (level === "level1") {
            updated[title] = { __steps__: [], _id: newMenu._id };
          }
          if (level === "level2") {
            updated[selected.selectedLevel1][title] = {
              __steps__: [],
              _id: newMenu._id,
            };
          }
          if (level === "level3") {
            updated[selected.selectedLevel1][selected.selectedLevel2][title] = {
              __steps__: [],
              _id: newMenu._id,
            };
          }
          return updated;
        });
      }

      onClose();
    } catch (err) {
      alert("Không thể thực hiện thao tác");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {config.type === "add" ? "Thêm" : "Sửa"} {config.level}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="Tên menu"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSave}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuDialog;
