import React, { useState, useEffect } from "react";
import { Box, Button, Breadcrumbs, Link, Typography } from "@mui/material";
import StepManager from "./TableEdit/StepManager";
import MenuTree from "./MenuTree";
import MenuDialog from "./MenuDialog";
import { api } from "./api/api";

const Header = () => {
  const [menuData, setMenuData] = useState({});
  console.log("🚀 ~ Header ~ menuData:", menuData);
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);
  const [showMenu, setShowMenu] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState({
    level: null,
    type: "add",
    value: "",
    target: null,
  });

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const topMenus = await api.getMenus(null);
        const structured = {};
        for (const item of topMenus) {
          structured[item.title] = { __steps__: [], _id: item._id };
        }
        setMenuData(structured);
      } catch (error) {
        console.error("Lỗi khi tải menu cấp 1:", error);
      }
    };
    fetchMenus();
  }, []);

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
      {/* Toggle & Breadcrumb */}
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

      {/* Tree Menu */}
      {showMenu && (
        <MenuTree
          menuData={menuData}
          setMenuData={setMenuData}
          selected={{ selectedLevel1, selectedLevel2, selectedLevel3 }}
          setSelected={{
            setSelectedLevel1,
            setSelectedLevel2,
            setSelectedLevel3,
          }}
          openDialog={(config) => {
            setDialogConfig(config);
            setDialogOpen(true);
          }}
        />
      )}

      {/* Steps */}
      {current && (
        <Box mt={1}>
          <StepManager steps={current.steps} onStepsChange={current.setSteps} />
        </Box>
      )}

      {/* Dialog */}
      <MenuDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        config={dialogConfig}
        setMenuData={setMenuData}
        menuData={menuData}
        selected={{ selectedLevel1, selectedLevel2, selectedLevel3 }}
        setSelected={{
          setSelectedLevel1,
          setSelectedLevel2,
          setSelectedLevel3,
        }}
      />
    </Box>
  );
};

export default Header;
