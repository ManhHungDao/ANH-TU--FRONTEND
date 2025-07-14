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
import StepManager from "./StepManager";

const initialMenu = {
  "Trang chủ": {
    __steps__: [{ id: 1, title: "Bước A1", content: "## Cấp 1 - Trang chủ" }],
    "Giới thiệu": {
      __steps__: [
        { id: 2, title: "Bước B1", content: "## Cấp 2 - Giới thiệu" },
      ],
      "Thông tin": {
        __steps__: [
          { id: 3, title: "Bước C1", content: "## Cấp 3 - Thông tin" },
        ],
      },
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

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogValue("");
    setEditTarget(null);
  };

  const handleDialogSubmit = () => {
    const value = dialogValue.trim();
    if (!value) return;
    const updated = { ...menuData };

    if (dialogLevel === "level1") {
      if (dialogType === "add") {
        updated[value] = { __steps__: [] };
      } else {
        updated[value] = updated[editTarget];
        delete updated[editTarget];
        if (selectedLevel1 === editTarget) setSelectedLevel1(value);
      }
    }

    if (dialogLevel === "level2" && selectedLevel1) {
      if (dialogType === "add") {
        updated[selectedLevel1][value] = { __steps__: [] };
      } else {
        updated[selectedLevel1][value] = updated[selectedLevel1][editTarget];
        delete updated[selectedLevel1][editTarget];
        if (selectedLevel2 === editTarget) setSelectedLevel2(value);
      }
    }

    if (dialogLevel === "level3" && selectedLevel1 && selectedLevel2) {
      if (dialogType === "add") {
        updated[selectedLevel1][selectedLevel2][value] = { __steps__: [] };
      } else {
        updated[selectedLevel1][selectedLevel2][value] =
          updated[selectedLevel1][selectedLevel2][editTarget];
        delete updated[selectedLevel1][selectedLevel2][editTarget];
        if (selectedLevel3 === editTarget) setSelectedLevel3(value);
      }
    }

    setMenuData(updated);
    closeDialog();
  };

  const handleDelete = (level, key) => {
    const updated = { ...menuData };

    if (level === "level1") {
      delete updated[key];
      setSelectedLevel1(null);
      setSelectedLevel2(null);
      setSelectedLevel3(null);
    }

    if (level === "level2") {
      delete updated[selectedLevel1][key];
      setSelectedLevel2(null);
      setSelectedLevel3(null);
    }

    if (level === "level3") {
      delete updated[selectedLevel1][selectedLevel2][key];
      setSelectedLevel3(null);
    }

    setMenuData(updated);
  };

  const level2 = selectedLevel1
    ? Object.keys(menuData[selectedLevel1]).filter((k) => k !== "__steps__")
    : [];

  const level3 =
    selectedLevel1 && selectedLevel2
      ? Object.keys(menuData[selectedLevel1][selectedLevel2]).filter(
          (k) => k !== "__steps__"
        )
      : [];

  const getCurrentStepContext = () => {
    if (selectedLevel1 && selectedLevel2 && selectedLevel3)
      return {
        steps:
          menuData[selectedLevel1][selectedLevel2][selectedLevel3].__steps__ ||
          [],
        setSteps: (newSteps) => {
          const updated = { ...menuData };
          updated[selectedLevel1][selectedLevel2][selectedLevel3].__steps__ =
            newSteps;
          setMenuData(updated);
        },
      };

    if (selectedLevel1 && selectedLevel2)
      return {
        steps: menuData[selectedLevel1][selectedLevel2].__steps__ || [],
        setSteps: (newSteps) => {
          const updated = { ...menuData };
          updated[selectedLevel1][selectedLevel2].__steps__ = newSteps;
          setMenuData(updated);
        },
      };

    if (selectedLevel1)
      return {
        steps: menuData[selectedLevel1].__steps__ || [],
        setSteps: (newSteps) => {
          const updated = { ...menuData };
          updated[selectedLevel1].__steps__ = newSteps;
          setMenuData(updated);
        },
      };

    return null;
  };

  const current = getCurrentStepContext();

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Quản lý Menu
      </Typography>

      {/* ===== Menu cấp 1 ===== */}
      <Box mb={2}>
        <Typography variant="h6">Menu cấp 1</Typography>
        <Button
          onClick={() => openDialog("level1", "add")}
          startIcon={<AddIcon />}
        >
          Thêm
        </Button>
        <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
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
      </Box>

      {/* ===== Menu cấp 2 ===== */}
      {selectedLevel1 && (
        <Box mb={2}>
          <Typography variant="subtitle1">Menu cấp 2</Typography>
          <Button
            onClick={() => openDialog("level2", "add")}
            startIcon={<AddIcon />}
          >
            Thêm
          </Button>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
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
        </Box>
      )}

      {/* ===== Menu cấp 3 ===== */}
      {selectedLevel2 && (
        <Box mb={2}>
          <Typography variant="subtitle1">Menu cấp 3</Typography>
          <Button
            onClick={() => openDialog("level3", "add")}
            startIcon={<AddIcon />}
          >
            Thêm
          </Button>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
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
        </Box>
      )}

      {/* ===== StepManager chỉ render một lần ===== */}
      {current && (
        <Box mt={4}>
          <StepManager steps={current.steps} onStepsChange={current.setSteps} />
        </Box>
      )}

      {/* ===== Dialog ===== */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth>
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
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Hủy</Button>
          <Button onClick={handleDialogSubmit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
