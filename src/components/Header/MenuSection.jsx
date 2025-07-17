import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuItemChip from "../MenuHeader/MenuItemChip";
import * as api from "../../utils/api";
const MenuSection = ({
  menuData,
  setMenuData,
  selected,
  setSelected,
  level2,
  level3,
  openDialog,
}) => {
  const handleDelete = async (level, key) => {
    const updated = { ...menuData };

    try {
      if (level === "level1") {
        const id = menuData[key].__id;
        await api.deleteMenu(id);
        delete updated[key];
        setSelected({ l1: null, l2: null, l3: null });
      }

      if (level === "level2") {
        const parentId = menuData[selected.l1].__id;
        const level2Id = menuData[selected.l1][key].__id;
        await api.deleteLevel2(parentId, level2Id);
        delete updated[selected.l1][key];
        setSelected({ ...selected, l2: null, l3: null });
      }

      if (level === "level3") {
        const parentId = menuData[selected.l1].__id;
        const level2Id = menuData[selected.l1][selected.l2].__id;
        const level3Id = menuData[selected.l1][selected.l2][key].__id;
        await api.deleteLevel3(parentId, level2Id, level3Id);
        delete updated[selected.l1][selected.l2][key];
        setSelected({ ...selected, l3: null });
      }

      setMenuData(updated);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <Box>
      {/* Level 1 */}
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
              selected={selected.l1 === key}
              onClick={() => setSelected({ l1: key, l2: null, l3: null })}
              onDelete={() => handleDelete("level1", key)}
              onEdit={() => openDialog("level1", "edit", key, key)}
            />
          ))}
        </Stack>
      </Box>

      {/* Level 2 */}
      {selected.l1 && (
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
                selected={selected.l2 === key}
                onClick={() => setSelected({ ...selected, l2: key, l3: null })}
                onDelete={() => handleDelete("level2", key)}
                onEdit={() => openDialog("level2", "edit", key, key)}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Level 3 */}
      {selected.l2 && (
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
                selected={selected.l3 === key}
                onClick={() => setSelected({ ...selected, l3: key })}
                onDelete={() => handleDelete("level3", key)}
                onEdit={() => openDialog("level3", "edit", key, key)}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default MenuSection;
