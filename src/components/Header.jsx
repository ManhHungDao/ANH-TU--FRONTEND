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
  Chip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItemChip from "./MenuItemChip";

const initialMenu = {
  "Trang chủ": {
    "Giới thiệu": {
      "Thông tin": [],
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
  const [selectedItemLevel3, setSelectedItemLevel3] = useState(null);
  const [menuVisible, setMenuVisible] = useState(true);

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
        if (selectedItemLevel3 === editTarget) {
          setSelectedItemLevel3(value);
        }
      }
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
        setSelectedItemLevel3(null);
      }
    }

    if (level === "level2" && selectedLevel1) {
      delete newData[selectedLevel1][target];
      if (selectedLevel2 === target) {
        setSelectedLevel2(null);
        setSelectedItemLevel3(null);
      }
    }

    if (level === "level3" && selectedLevel1 && selectedLevel2) {
      delete newData[selectedLevel1][selectedLevel2][target];
      if (selectedItemLevel3 === target) {
        setSelectedItemLevel3(null);
      }
    }

    setMenuData(newData);
  };

  const level2 = selectedLevel1 ? Object.keys(menuData[selectedLevel1]) : [];
  const level3 =
    selectedLevel1 && selectedLevel2
      ? Object.keys(menuData[selectedLevel1][selectedLevel2])
      : [];

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      setSelectedLevel2(null);
      setSelectedItemLevel3(null);
    } else if (index === 1) {
      setSelectedItemLevel3(null);
    }
  };

  return (
    <Box p={2} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      {/* Breadcrumb */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        mb={2}
        flexWrap="wrap"
      >
        <Typography fontWeight="bold">Đường dẫn:</Typography>
        {[selectedLevel1, selectedLevel2, selectedItemLevel3]
          .filter(Boolean)
          .map((item, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <Typography>{">"}</Typography>}
              <Chip
                label={item}
                variant="outlined"
                clickable
                onClick={() => handleBreadcrumbClick(idx)}
              />
            </React.Fragment>
          ))}
      </Stack>

      {/* Toggle menu */}
      <Button
        variant="outlined"
        onClick={() => setMenuVisible((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {menuVisible ? "Ẩn menu" : "Hiện menu"}
      </Button>

      {/* Menu 3 cấp */}
      {menuVisible && (
        <Box>
          {/* ===== CẤP 1 ===== */}
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
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
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {Object.keys(menuData).map((key) => (
                <MenuItemChip
                  key={key}
                  label={key}
                  selected={selectedLevel1 === key}
                  onClick={() => {
                    setSelectedLevel1(key);
                    setSelectedLevel2(null);
                    setSelectedItemLevel3(null);
                  }}
                  onDelete={() => handleDelete("level1", key)}
                  onEdit={() => openDialog("level1", "edit", key, key)}
                />
              ))}
            </Stack>
          </Box>

          {/* ===== CẤP 2 ===== */}
          {selectedLevel1 && (
            <Box mb={2}>
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
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {level2.map((key) => (
                  <MenuItemChip
                    key={key}
                    label={key}
                    selected={selectedLevel2 === key}
                    onClick={() => {
                      setSelectedLevel2(key);
                      setSelectedItemLevel3(null);
                    }}
                    onDelete={() => handleDelete("level2", key)}
                    onEdit={() => openDialog("level2", "edit", key, key)}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* ===== CẤP 3 ===== */}
          {selectedLevel2 && (
            <Box mb={2}>
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
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {level3.map((key) => (
                  <MenuItemChip
                    key={key}
                    label={key}
                    selected={selectedItemLevel3 === key}
                    onClick={() => setSelectedItemLevel3(key)}
                    onDelete={() => handleDelete("level3", key)}
                    onEdit={() => openDialog("level3", "edit", key, key)}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}

      {/* ===== MODAL THÊM/SỬA ===== */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
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
          <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleDialogSubmit}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
