import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import StepManager from "../TableEdit/StepManager";
import * as api from "../../utils/api";

import MenuToggleButton from "./MenuToggleButton";
import MenuBreadcrumbs from "./MenuBreadcrumbs";
import MenuSection from "./MenuSection";
import MenuDialog from "./MenuDialog";

const Header = () => {
  const [menuData, setMenuData] = useState({});
  const [selectedLevel, setSelectedLevel] = useState({
    l1: null,
    l2: null,
    l3: null,
  });
  const [showMenu, setShowMenu] = useState(true);
  const [dialog, setDialog] = useState({
    open: false,
    level: null,
    type: "add",
    value: "",
    target: null,
  });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menus = await api.fetchAllMenus();
        const formatted = menus.reduce((acc, menu) => {
          const l1 = menu.name;
          const l1Obj = { __id: menu._id, __steps__: menu.steps || [] };
          menu.children?.forEach((l2) => {
            const l2Obj = { __id: l2._id, __steps__: l2.steps || [] };
            l2.children?.forEach((l3) => {
              l2Obj[l3.name] = { __id: l3._id, __steps__: l3.steps || [] };
            });
            l1Obj[l2.name] = l2Obj;
          });
          acc[l1] = l1Obj;
          return acc;
        }, {});
        setMenuData(formatted);
      } catch (err) {
        console.error("Failed to fetch menus:", err);
      }
    };
    fetchMenus();
  }, []);

  const openDialog = (level, type, target = null, value = "") =>
    setDialog({ open: true, level, type, value, target });

  const closeDialog = () =>
    setDialog({
      open: false,
      level: null,
      type: "add",
      value: "",
      target: null,
    });

  const setStepData = (steps, levelPath) => {
    const updated = { ...menuData };
    const target = levelPath.reduce((acc, key) => acc[key], updated);
    target.__steps__ = steps;
    setMenuData(updated);
  };

  const getStepsContext = () => {
    const { l1, l2, l3 } = selectedLevel;
    if (l1 && l2 && l3)
      return {
        steps: menuData[l1][l2][l3].__steps__,
        setSteps: (s) => setStepData(s, [l1, l2, l3]),
        location: {
          menuId: menuData[l1].__id,
          level2Id: menuData[l1][l2].__id,
          level3Id: menuData[l1][l2][l3].__id,
        },
      };
    if (l1 && l2)
      return {
        steps: menuData[l1][l2].__steps__,
        setSteps: (s) => setStepData(s, [l1, l2]),
        location: {
          menuId: menuData[l1].__id,
          level2Id: menuData[l1][l2].__id,
        },
      };
    if (l1)
      return {
        steps: menuData[l1].__steps__,
        setSteps: (s) => setStepData(s, [l1]),
        location: {
          menuId: menuData[l1].__id,
        },
      };
    return null;
  };

  const level2 = selectedLevel.l1
    ? Object.keys(menuData[selectedLevel.l1]).filter((k) => !k.startsWith("__"))
    : [];
  const level3 = selectedLevel.l2
    ? Object.keys(menuData[selectedLevel.l1]?.[selectedLevel.l2] || {}).filter(
        (k) => !k.startsWith("__")
      )
    : [];

  const current = getStepsContext();

  return (
    <Box sx={{ bgcolor: "#f5f7fa", p: 3, minHeight: "100vh" }}>
      <MenuToggleButton showMenu={showMenu} setShowMenu={setShowMenu} />
      <MenuBreadcrumbs
        selected={selectedLevel}
        setSelected={setSelectedLevel}
        setShowMenu={setShowMenu}
      />
      {showMenu && (
        <MenuSection
          menuData={menuData}
          setMenuData={setMenuData}
          selected={selectedLevel}
          setSelected={setSelectedLevel}
          level2={level2}
          level3={level3}
          openDialog={openDialog}
        />
      )}
      {current && (
        <Box mt={1}>
          <StepManager
            steps={current.steps}
            onStepsChange={current.setSteps}
            location={current.location}
          />
        </Box>
      )}
      <MenuDialog
        dialog={dialog}
        setDialog={setDialog}
        menuData={menuData}
        setMenuData={setMenuData}
        selected={selectedLevel}
      />
    </Box>
  );
};

export default Header;
