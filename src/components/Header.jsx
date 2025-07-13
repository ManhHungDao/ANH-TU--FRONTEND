import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItemChip from "./MenuItemChip";

const initialMenu = {
  "Trang chủ": {
    "Giới thiệu": {
      "Thông tin": ["Chi tiết A", "Chi tiết B"],
      "Tầm nhìn": [],
    },
    "Tin tức": {
      "Bản tin 1": [],
      "Bản tin 2": [],
    },
  },
};

const Header = () => {
  const [menuData, setMenuData] = useState(initialMenu);
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLevel, setDialogLevel] = useState(null);
  const [dialogType, setDialogType] = useState("add");
  const [dialogValue, setDialogValue] = useState("");
  const [editTarget, setEditTarget] = useState(null);

  const openDialog = (level, type, target = null, defaultValue = "") => {
    setDialogLevel(level);
    setDialogType(type);
    setEditTarget(target);
    setDialogValue(defaultValue);
    setDialogOpen(true);
  };

  const handleDialogSubmit = () => {
    const value = dialogValue.trim();
    if (!value) return;

    const newData = { ...menuData };

    if (dialogLevel === "level1") {
      if (dialogType === "add") {
        newData[value] = {};
      } else if (dialogType === "edit") {
        newData[value] = newData[editTarget];
        delete newData[editTarget];
        if (selectedLevel1 === editTarget) {
          setSelectedLevel1(value);
        }
      }
    }

    if (dialogLevel === "level2") {
      if (!selectedLevel1) return;
      if (dialogType === "add") {
        newData[selectedLevel1][value] = {};
      } else if (dialogType === "edit") {
        newData[selectedLevel1][value] = newData[selectedLevel1][editTarget];
        delete newData[selectedLevel1][editTarget];
        if (selectedLevel2 === editTarget) {
          setSelectedLevel2(value);
        }
      }
    }

    if (dialogLevel === "level3") {
      if (!selectedLevel1 || !selectedLevel2) return;
      if (dialogType === "add") {
        newData[selectedLevel1][selectedLevel2][value] = [];
      } else if (dialogType === "edit") {
        newData[selectedLevel1][selectedLevel2][value] =
          newData[selectedLevel1][selectedLevel2][editTarget];
        delete newData[selectedLevel1][selectedLevel2][editTarget];
        if (selectedLevel3 === editTarget) {
          setSelectedLevel3(value);
        }
      }
    }

    if (dialogLevel === "level4") {
      if (!selectedLevel1 || !selectedLevel2 || !selectedLevel3) return;
      const list =
        newData[selectedLevel1][selectedLevel2][selectedLevel3] || [];
      if (dialogType === "add") {
        list.push(value);
      } else if (dialogType === "edit") {
        const index = list.indexOf(editTarget);
        if (index !== -1) list[index] = value;
      }
      newData[selectedLevel1][selectedLevel2][selectedLevel3] = list;
    }

    setMenuData(newData);
    setDialogOpen(false);
    setDialogValue("");
  };

  const handleDelete = (level, target) => {
    const newData = { ...menuData };

    if (level === "level1") {
      delete newData[target];
      if (selectedLevel1 === target) {
        setSelectedLevel1(null);
        setSelectedLevel2(null);
        setSelectedLevel3(null);
      }
    }

    if (level === "level2" && selectedLevel1) {
      delete newData[selectedLevel1][target];
      if (selectedLevel2 === target) {
        setSelectedLevel2(null);
        setSelectedLevel3(null);
      }
    }

    if (level === "level3" && selectedLevel1 && selectedLevel2) {
      delete newData[selectedLevel1][selectedLevel2][target];
      if (selectedLevel3 === target) {
        setSelectedLevel3(null);
      }
    }

    if (
      level === "level4" &&
      selectedLevel1 &&
      selectedLevel2 &&
      selectedLevel3
    ) {
      newData[selectedLevel1][selectedLevel2][selectedLevel3] = newData[
        selectedLevel1
      ][selectedLevel2][selectedLevel3].filter((item) => item !== target);
    }

    setMenuData(newData);
  };

  const level2 = selectedLevel1 ? Object.keys(menuData[selectedLevel1]) : [];

  const level3 =
    selectedLevel1 && selectedLevel2
      ? Object.keys(menuData[selectedLevel1][selectedLevel2])
      : [];

  const level4 =
    selectedLevel1 && selectedLevel2 && selectedLevel3
      ? menuData[selectedLevel1][selectedLevel2][selectedLevel3] || []
      : [];

  return (
    <Box p={2} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      {/* ===== CẤP 1 ===== */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Menu cấp 1</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openDialog("level1", "add")}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Thêm menu cấp 1
        </Button>
      </Box>
      <Stack direction="row" spacing={1} mb={2}>
        {Object.keys(menuData).map((key) => (
          <MenuItemChip
            key={key}
            label={key}
            selected={selectedLevel1 === key}
            onClick={() => {
              setSelectedLevel1(key);
              setSelectedLevel2(null);
              setSelectedLevel3(null);
            }}
            onDelete={() => handleDelete("level1", key)}
            onEdit={() => openDialog("level1", "edit", key, key)}
          />
        ))}
      </Stack>

      {/* ===== CẤP 2 ===== */}
      {selectedLevel1 && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1">Menu cấp 2</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openDialog("level2", "add")}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Thêm menu cấp 2
            </Button>
          </Box>
          <Stack direction="row" spacing={1} mb={2}>
            {level2.map((key) => (
              <MenuItemChip
                key={key}
                label={key}
                selected={selectedLevel2 === key}
                onClick={() => {
                  setSelectedLevel2(key);
                  setSelectedLevel3(null);
                }}
                onDelete={() => handleDelete("level2", key)}
                onEdit={() => openDialog("level2", "edit", key, key)}
              />
            ))}
          </Stack>
        </>
      )}

      {/* ===== CẤP 3 ===== */}
      {selectedLevel2 && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1">Menu cấp 3</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openDialog("level3", "add")}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Thêm menu cấp 3
            </Button>
          </Box>
          <Stack direction="row" spacing={1} mb={2}>
            {level3.map((key) => (
              <MenuItemChip
                key={key}
                label={key}
                selected={selectedLevel3 === key}
                onClick={() => setSelectedLevel3(key)}
                onDelete={() => handleDelete("level3", key)}
                onEdit={() => openDialog("level3", "edit", key, key)}
              />
            ))}
          </Stack>
        </>
      )}

      {/* ===== CẤP 4 ===== */}
      {selectedLevel3 && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1">Menu cấp 4</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openDialog("level4", "add")}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Thêm menu cấp 4
            </Button>
          </Box>
          <Stack direction="row" spacing={1}>
            {level4.map((item, index) => (
              <MenuItemChip
                key={index}
                label={item}
                onDelete={() => handleDelete("level4", item)}
                onEdit={() => openDialog("level4", "edit", item, item)}
              />
            ))}
          </Stack>
        </>
      )}

      {/* ===== MODAL THÊM/SỬA ===== */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {dialogType === "add" ? "Thêm" : "Sửa"} {dialogLevel}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tên menu"
            value={dialogValue}
            onChange={(e) => setDialogValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleDialogSubmit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
