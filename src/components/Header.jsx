import React, { useState, useEffect } from "react";
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
  Breadcrumbs,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItemChip from "./MenuHeader/MenuItemChip";
import StepManager from "./TableEdit/StepManager";
import * as api from "../utils/api";

const Header = () => {
  const [menuData, setMenuData] = useState({});
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);
  const [showMenu, setShowMenu] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogLevel, setDialogLevel] = useState(null);
  const [dialogType, setDialogType] = useState("add");
  const [dialogValue, setDialogValue] = useState("");
  const [editTarget, setEditTarget] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await api.fetchAllMenus();
        const formattedMenus = menus.reduce((acc, menu) => {
          const level1 = menu.name;
          const level1Obj = {
            __id: menu._id,
            __steps__: menu.steps || [],
          };

          menu.children?.forEach((level2) => {
            const level2Name = level2.name;
            const level2Obj = {
              __id: level2._id,
              __steps__: level2.steps || [],
            };

            level2.children?.forEach((level3) => {
              const level3Name = level3.name;
              level2Obj[level3Name] = {
                __id: level3._id,
                __steps__: level3.steps || [],
              };
            });

            level1Obj[level2Name] = level2Obj;
          });

          acc[level1] = level1Obj;
          return acc;
        }, {});
        setMenuData(formattedMenus);
      } catch (error) {
        console.error("Failed to fetch menus:", error);
      }
    };

    fetchMenus();
  }, []);

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

  const handleDialogSubmit = async () => {
    const value = dialogValue.trim();
    if (!value) return;

    const updated = { ...menuData };

    try {
      if (dialogLevel === "level1") {
        if (dialogType === "add") {
          const newMenu = await api.createMenu(value);
          updated[value] = {
            __id: newMenu._id,
            __steps__: [],
          };
        } else {
          await api.updateMenu(editTarget, value);
          updated[value] = updated[editTarget];
          delete updated[editTarget];
          if (selectedLevel1 === editTarget) setSelectedLevel1(value);
        }
      }

      if (dialogLevel === "level2" && selectedLevel1) {
        if (dialogType === "add") {
          const parentId = menuData[selectedLevel1].__id;
          const newLevel2 = await api.addLevel2(parentId, value);
          updated[selectedLevel1][value] = {
            __id: newLevel2._id,
            __steps__: [],
          };
        } else {
          const parentId = menuData[selectedLevel1].__id;
          await api.updateLevel2(parentId, editTarget, value);
          updated[selectedLevel1][value] = updated[selectedLevel1][editTarget];
          delete updated[selectedLevel1][editTarget];
          if (selectedLevel2 === editTarget) setSelectedLevel2(value);
        }
      }

      if (dialogLevel === "level3" && selectedLevel1 && selectedLevel2) {
        const parentId = menuData[selectedLevel1][selectedLevel2].__id;
        if (dialogType === "add") {
          const newLevel3 = await api.addLevel3(parentId, value);
          updated[selectedLevel1][selectedLevel2][value] = {
            __id: newLevel3._id,
            __steps__: [],
          };
        } else {
          await api.updateLevel3(parentId, editTarget, value);
          updated[selectedLevel1][selectedLevel2][value] =
            updated[selectedLevel1][selectedLevel2][editTarget];
          delete updated[selectedLevel1][selectedLevel2][editTarget];
          if (selectedLevel3 === editTarget) setSelectedLevel3(value);
        }
      }

      setMenuData(updated);
      closeDialog();
    } catch (error) {
      console.error("Failed to update menu:", error);
    }
  };

  const handleDelete = async (level, key) => {
    const updated = { ...menuData };

    try {
      if (level === "level1") {
        const id = menuData[key].__id;
        await api.deleteMenu(id);
        delete updated[key];
        setSelectedLevel1(null);
        setSelectedLevel2(null);
        setSelectedLevel3(null);
      }

      if (level === "level2") {
        const id = menuData[selectedLevel1][key].__id;
        await api.deleteLevel2(id);
        delete updated[selectedLevel1][key];
        setSelectedLevel2(null);
        setSelectedLevel3(null);
      }

      if (level === "level3") {
        const id = menuData[selectedLevel1][selectedLevel2][key].__id;
        await api.deleteLevel3(id);
        delete updated[selectedLevel1][selectedLevel2][key];
        setSelectedLevel3(null);
      }

      setMenuData(updated);
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

  const level2 = selectedLevel1
    ? Object.keys(menuData[selectedLevel1]).filter(
        (k) => k !== "__steps__" && k !== "__id"
      )
    : [];

  const level3 =
    selectedLevel1 && selectedLevel2
      ? Object.keys(menuData[selectedLevel1][selectedLevel2]).filter(
          (k) => k !== "__steps__" && k !== "__id"
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
        location: {
          menuId: menuData[selectedLevel1].__id,
          level2Id: menuData[selectedLevel1][selectedLevel2].__id,
          level3Id:
            menuData[selectedLevel1][selectedLevel2][selectedLevel3].__id,
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
        location: {
          menuId: menuData[selectedLevel1].__id,
          level2Id: menuData[selectedLevel1][selectedLevel2].__id,
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
        location: {
          menuId: menuData[selectedLevel1].__id,
        },
      };

    return null;
  };

  const current = getCurrentStepContext();

  return (
    <Box sx={{ bgcolor: "#f5f7fa", p: 3, minHeight: "100vh" }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setShowMenu((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {showMenu ? "Ẩn quản lý menu" : "Hiện quản lý menu"}
      </Button>

      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => {
            setShowMenu(true);
            setSelectedLevel2(null);
            setSelectedLevel3(null);
          }}
          sx={{ cursor: "pointer" }}
        >
          {selectedLevel1 || "Chọn menu cấp 1"}
        </Link>
        {selectedLevel2 && (
          <Link
            underline="hover"
            color="inherit"
            onClick={() => {
              setShowMenu(true);
              setSelectedLevel3(null);
            }}
            sx={{ cursor: "pointer" }}
          >
            {selectedLevel2}
          </Link>
        )}
        {selectedLevel3 && (
          <Typography color="text.primary">{selectedLevel3}</Typography>
        )}
      </Breadcrumbs>

      {showMenu && (
        <Box>
          {/* Menu cấp 1 */}
          <Box mb={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="bold">Menu cấp 1</Typography>
              <Button
                onClick={() => openDialog("level1", "add")}
                startIcon={<AddIcon />}
              >
                Thêm
              </Button>
            </Stack>
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

          {/* Menu cấp 2 */}
          {selectedLevel1 && (
            <Box mb={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">Menu cấp 2</Typography>
                <Button
                  onClick={() => openDialog("level2", "add")}
                  startIcon={<AddIcon />}
                >
                  Thêm
                </Button>
              </Stack>
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

          {/* Menu cấp 3 */}
          {selectedLevel2 && (
            <Box mb={3}>
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">Menu cấp 3</Typography>
                <Button
                  onClick={() => openDialog("level3", "add")}
                  startIcon={<AddIcon />}
                >
                  Thêm
                </Button>
              </Stack>
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
        </Box>
      )}

      {/* Danh sách các bước */}
      {current && (
        <Box mt={1}>
          <StepManager
            steps={current.steps}
            onStepsChange={current.setSteps}
            location={current.location}
          />
        </Box>
      )}

      {/* Dialog */}
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
