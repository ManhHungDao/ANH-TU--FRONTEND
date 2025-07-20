// components/MenuTree.jsx
import React, { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItemChip from "./MenuItemChip";
import ConfirmDialog from "./common/ConfirmDialog";
import { api } from "./api/api";

const MenuTree = ({
  menuData,
  setMenuData,
  selected,
  setSelected,
  openDialog,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { selectedLevel1, selectedLevel2, selectedLevel3 } = selected;
  const { setSelectedLevel1, setSelectedLevel2, setSelectedLevel3 } =
    setSelected;

  const fetchMenuFromApi = async (menuId, level, parentKey = null) => {
    try {
      const menu = await api.getMenuTreeById(menuId);
      const { steps = [], children = [] } = menu;

      setMenuData((prev) => {
        const updated = { ...prev };

        if (level === "level1") {
          updated[menu.title] = {
            ...updated[menu.title],
            __steps__: steps,
            _id: menu._id,
          };
          children.forEach((child) => {
            updated[menu.title][child.title] = {
              __steps__: [],
              _id: child._id,
            };
          });
        }

        if (level === "level2" && parentKey) {
          updated[parentKey][menu.title] = {
            ...updated[parentKey][menu.title],
            __steps__: steps,
            _id: menu._id,
          };
          children.forEach((child) => {
            updated[parentKey][menu.title][child.title] = {
              __steps__: [],
              _id: child._id,
            };
          });
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
    } catch (err) {
      console.error("Lỗi khi fetch menu:", err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (itemToDelete?.type === "menu") {
        await api.deleteMenu(itemToDelete.id);

        const { level, key } = itemToDelete;
        const updated = { ...menuData };

        if (level === "level1") {
          delete updated[key];
          setSelectedLevel1(null);
          setSelectedLevel2(null);
          setSelectedLevel3(null);
        } else if (level === "level2") {
          delete updated[selectedLevel1][key];
          setSelectedLevel2(null);
          setSelectedLevel3(null);
        } else if (level === "level3") {
          delete updated[selectedLevel1][selectedLevel2][key];
          setSelectedLevel3(null);
        }

        setMenuData(updated);
      }
    } catch (error) {
      console.error("Lỗi khi xoá menu:", error);
    } finally {
      setConfirmOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDelete = (level, key) => {
    let id;

    if (level === "level1") {
      id = menuData[key]._id;
    } else if (level === "level2") {
      id = menuData[selectedLevel1][key]._id;
    } else if (level === "level3") {
      id = menuData[selectedLevel1][selectedLevel2][key]._id;
    }

    setItemToDelete({
      type: "menu",
      id,
      level,
      key,
      title: key,
    });
    setConfirmOpen(true);
  };

  const level2 =
    selectedLevel1 &&
    Object.keys(menuData[selectedLevel1]).filter(
      (k) => k !== "__steps__" && k !== "_id"
    );

  const level3 =
    selectedLevel1 &&
    selectedLevel2 &&
    Object.keys(menuData[selectedLevel1][selectedLevel2]).filter(
      (k) => k !== "__steps__" && k !== "_id"
    );

  return (
    <>
      <Box>
        {/* ===== Menu cấp 1 ===== */}
        <Box mb={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="bold">Menu cấp 1</Typography>
            <Button
              onClick={() => openDialog({ level: "level1", type: "add" })}
              startIcon={<AddIcon />}
            >
              Thêm
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {Object.keys(menuData)
              .filter((key) => key !== "_id")
              .map((key) => (
                <MenuItemChip
                  key={key}
                  label={key}
                  selected={selectedLevel1 === key}
                  onClick={() => {
                    setSelectedLevel1(key);
                    setSelectedLevel2(null);
                    setSelectedLevel3(null);
                    fetchMenuFromApi(menuData[key]._id, "level1");
                  }}
                  onDelete={() => handleDelete("level1", key)}
                  onEdit={() =>
                    openDialog({
                      level: "level1",
                      type: "edit",
                      target: key,
                      value: key,
                    })
                  }
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
                onClick={() => openDialog({ level: "level2", type: "add" })}
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
                    fetchMenuFromApi(menuId, "level2", selectedLevel1);
                  }}
                  onDelete={() => handleDelete("level2", key)}
                  onEdit={() =>
                    openDialog({
                      level: "level2",
                      type: "edit",
                      target: key,
                      value: key,
                    })
                  }
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
                onClick={() => openDialog({ level: "level3", type: "add" })}
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
                    fetchMenuFromApi(menuId, "level3", {
                      parent: selectedLevel1,
                      child: selectedLevel2,
                    });
                  }}
                  onDelete={() => handleDelete("level3", key)}
                  onEdit={() =>
                    openDialog({
                      level: "level3",
                      type: "edit",
                      target: key,
                      value: key,
                    })
                  }
                />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
      <ConfirmDialog
        open={confirmOpen}
        title={`Xác nhận xoá ${
          itemToDelete?.type === "menu" ? "menu" : "danh mục"
        }`}
        message={`Bạn có chắc chắn muốn xoá "${itemToDelete?.title}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default MenuTree;
