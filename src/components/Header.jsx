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
import MenuItemChip from "./MenuItemChip";
import StepManager from "./TableEdit/StepManager";
import { api } from "./api/api";

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
        const level1Menus = await api.getMenus(null);

        // Tạo cấu trúc menuData từ danh sách trả về
        const structured = {};
        for (const item of level1Menus) {
          structured[item.title] = {
            __steps__: [],
            _id: item._id,
          };
        }

        setMenuData(structured);
      } catch (error) {
        console.error("Lỗi khi tải menu cấp 1:", error);
      }
    };

    fetchMenus();
  }, []);

  const fetchMenuFromApi = async (
    menuId,
    onUpdateSteps,
    level,
    parentKey = null
  ) => {
    try {
      const menu = await api.getMenuTreeById(menuId);
      const steps = menu.steps || [];
      const children = menu.children || [];

      onUpdateSteps(steps);

      setMenuData((prev) => {
        const updated = { ...prev };

        if (level === "level1") {
          updated[menu.title] = {
            ...updated[menu.title],
            __steps__: steps,
            _id: menu._id,
          };

          // Thêm menu con (level 2)
          for (const child of children) {
            updated[menu.title][child.title] = {
              __steps__: [],
              _id: child._id,
            };
          }
        }

        if (level === "level2" && parentKey) {
          updated[parentKey][menu.title] = {
            ...updated[parentKey][menu.title],
            __steps__: steps,
            _id: menu._id,
          };

          // Thêm menu con (level 3)
          for (const child of children) {
            updated[parentKey][menu.title][child.title] = {
              __steps__: [],
              _id: child._id,
            };
          }
        }

        if (level === "level3" && parentKey) {
          updated[parentKey.parent][parentKey.child][menu.title] = {
            ...updated[parentKey.parent][parentKey.child][menu.title],
            __steps__: steps,
            _id: menu._id,
          };
        }

        return updated;
      });
    } catch (error) {
      console.error("Lỗi khi lấy menu từ API:", error);
    }
  };

  const handleDialogSave = async () => {
    const newTitle = dialogValue.trim();
    if (!newTitle) return;

    try {
      if (dialogType === "edit") {
        // === Chỉnh sửa ===
        let targetId = null;
        let oldTitle = editTarget;

        if (dialogLevel === "level1") {
          targetId = menuData[oldTitle]?._id;
        }

        if (dialogLevel === "level2") {
          targetId = menuData[selectedLevel1]?.[oldTitle]?._id;
        }

        if (dialogLevel === "level3") {
          targetId =
            menuData[selectedLevel1]?.[selectedLevel2]?.[oldTitle]?._id;
        }

        if (!targetId) throw new Error("Không tìm thấy menu để sửa");

        await api.updateMenuTitle(targetId, newTitle);

        setMenuData((prev) => {
          const updated = { ...(prev || {}) };

          if (dialogLevel === "level1") {
            if (!updated[oldTitle]) return prev;
            updated[newTitle] = updated[oldTitle];
            delete updated[oldTitle];
          }

          if (dialogLevel === "level2") {
            if (!updated[selectedLevel1]?.[oldTitle]) return prev;
            updated[selectedLevel1] = {
              ...(updated[selectedLevel1] || {}),
              [newTitle]: updated[selectedLevel1][oldTitle],
            };
            delete updated[selectedLevel1][oldTitle];
          }

          if (dialogLevel === "level3") {
            if (!updated[selectedLevel1]?.[selectedLevel2]?.[oldTitle])
              return prev;
            updated[selectedLevel1][selectedLevel2] = {
              ...(updated[selectedLevel1][selectedLevel2] || {}),
              [newTitle]: updated[selectedLevel1][selectedLevel2][oldTitle],
            };
            delete updated[selectedLevel1][selectedLevel2][oldTitle];
          }

          return updated;
        });

        // Nếu đang chọn menu bị sửa → cập nhật tên đã chọn
        if (dialogLevel === "level1" && selectedLevel1 === oldTitle)
          setSelectedLevel1(newTitle);
        if (dialogLevel === "level2" && selectedLevel2 === oldTitle)
          setSelectedLevel2(newTitle);
        if (dialogLevel === "level3" && selectedLevel3 === oldTitle)
          setSelectedLevel3(newTitle);
      } else {
        // === Thêm mới ===
        let parentId = null;

        if (dialogLevel === "level2") {
          const parentMenu = menuData[selectedLevel1];
          parentId = parentMenu?._id;
        }

        if (dialogLevel === "level3") {
          const parentMenu = menuData[selectedLevel1]?.[selectedLevel2];
          parentId = parentMenu?._id;
        }

        const createdMenu = await api.createMenu({
          title: newTitle,
          parent: parentId, // null nếu là level1
        });

        setMenuData((prev) => {
          const updated = { ...prev };

          if (dialogLevel === "level1") {
            updated[newTitle] = { __steps__: [], _id: createdMenu._id };
          }

          if (dialogLevel === "level2") {
            if (!updated[selectedLevel1]) return prev;
            updated[selectedLevel1] = {
              ...updated[selectedLevel1],
              [newTitle]: { __steps__: [], _id: createdMenu._id },
            };
          }

          if (dialogLevel === "level3") {
            if (!updated[selectedLevel1]?.[selectedLevel2]) return prev;
            updated[selectedLevel1][selectedLevel2] = {
              ...updated[selectedLevel1][selectedLevel2],
              [newTitle]: { __steps__: [], _id: createdMenu._id },
            };
          }

          return updated;
        });
      }

      setDialogOpen(false);
    } catch (err) {
      console.error("Lỗi tạo/sửa menu:", err);
      alert("Không thể thực hiện thao tác. Vui lòng thử lại.");
    }
  };

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
    try {
      const value = dialogValue.trim();
      if (!value) return;

      // Gọi API để lưu menu mới
      handleDialogSave(); //
    } catch (error) {}
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
    <Box sx={{ bgcolor: "#f5f7fa", p: 3, minHeight: "100vh" }}>
      {/* ===== Toggle & Breadcrumb ===== */}
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

      {/* ===== QUẢN LÝ MENU ẨN/HIỆN ===== */}
      {showMenu && (
        <Box>
          {/* ===== Menu cấp 1 ===== */}
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

                    const menuId = menuData[key]._id;
                    fetchMenuFromApi(menuId, () => {}, "level1");
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

                      const menuId = menuData[selectedLevel1]?.[key]?._id;
                      fetchMenuFromApi(
                        menuId,
                        () => {},
                        "level2",
                        selectedLevel1
                      );
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
                    onClick={() => {
                      setSelectedLevel3(key);

                      const menuId =
                        menuData[selectedLevel1]?.[selectedLevel2]?.[key]?._id;
                      fetchMenuFromApi(menuId, () => {}, "level3", {
                        parent: selectedLevel1,
                        child: selectedLevel2,
                      });
                    }}
                    onDelete={() => handleDelete("level3", key)}
                    onEdit={() => openDialog("level3", "edit", key, key)}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}

      {/* ===== Danh sách các bước ===== */}
      {current && (
        <Box mt={1}>
          {/* <Typography variant="h6" fontWeight="bold" gutterBottom>
            Danh sách các bước
          </Typography> */}
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
