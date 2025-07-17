import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import * as api from "../../utils/api";

const MenuDialog = ({ dialog, setDialog, menuData, setMenuData, selected }) => {
  const handleSubmit = async () => {
    const value = dialog.value.trim();
    if (!value) return;
    const updated = { ...menuData };

    try {
      if (dialog.level === "level1") {
        if (dialog.type === "add") {
          const newMenu = await api.createMenu(value);
          updated[value] = { __id: newMenu._id, __steps__: [] };
        } else {
          await api.updateMenu(dialog.target, value);
          updated[value] = updated[dialog.target];
          delete updated[dialog.target];
        }
      }

      if (dialog.level === "level2" && selected.l1) {
        const parentId = menuData[selected.l1].__id;
        if (dialog.type === "add") {
          const newLevel2 = await api.addLevel2(parentId, value);
          updated[selected.l1][value] = { __id: newLevel2._id, __steps__: [] };
        } else {
          await api.updateLevel2(parentId, dialog.target, value);
          updated[selected.l1][value] = updated[selected.l1][dialog.target];
          delete updated[selected.l1][dialog.target];
        }
      }

      if (dialog.level === "level3" && selected.l1 && selected.l2) {
        const parentId = menuData[selected.l1][selected.l2].__id;
        if (dialog.type === "add") {
          const newLevel3 = await api.addLevel3(parentId, value);
          updated[selected.l1][selected.l2][value] = {
            __id: newLevel3._id,
            __steps__: [],
          };
        } else {
          await api.updateLevel3(parentId, dialog.target, value);
          updated[selected.l1][selected.l2][value] =
            updated[selected.l1][selected.l2][dialog.target];
          delete updated[selected.l1][selected.l2][dialog.target];
        }
      }

      setMenuData(updated);
      setDialog({
        open: false,
        level: null,
        type: "add",
        value: "",
        target: null,
      });
    } catch (err) {
      console.error("Failed to submit dialog:", err);
    }
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={() => setDialog({ ...dialog, open: false })}
      fullWidth
    >
      <DialogTitle>
        {dialog.type === "add" ? "Thêm" : "Sửa"} {dialog.level}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="Tên menu"
          value={dialog.value}
          onChange={(e) => setDialog({ ...dialog, value: e.target.value })}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog({ ...dialog, open: false })}>
          Hủy
        </Button>
        <Button onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MenuDialog;
