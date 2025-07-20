import React, { useState, useEffect } from "react";
import { Box, Button, Breadcrumbs, Link, Typography } from "@mui/material";
import StepManager from "./TableEdit/StepManager";
import MenuTree from "./MenuTree";
import MenuDialog from "./MenuDialog";
import LoadingBackdrop from "./common/LoadingBackdrop";
import SnackbarAlert from "./common/SnackbarAlert";
import { api } from "./api/api";

const Header = () => {
  const [menuData, setMenuData] = useState({});
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

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const fetchMenus = async () => {
      setLoading(true);
      try {
        const topMenus = await api.getMenus(null);
        const structured = {};
        for (const item of topMenus) {
          structured[item.title] = { __steps__: [], _id: item._id };
        }
        setMenuData(structured);
      } catch (error) {
        console.error("Lỗi khi tải menu cấp 1:", error);
        showSnackbar("Lỗi khi tải menu cấp 1", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const getCurrentMenuId = () => {
    try {
      if (selectedLevel1 && selectedLevel2 && selectedLevel3) {
        return (
          menuData?.[selectedLevel1]?.[selectedLevel2]?.[selectedLevel3]?._id ||
          null
        );
      }
      if (selectedLevel1 && selectedLevel2) {
        return menuData?.[selectedLevel1]?.[selectedLevel2]?._id || null;
      }
      if (selectedLevel1) {
        return menuData?.[selectedLevel1]?._id || null;
      }
      return null;
    } catch (err) {
      console.error("Lỗi khi lấy menuId:", err);
      return null;
    }
  };

  const menuId = getCurrentMenuId();

  return (
    <Box sx={{ bgcolor: "#f5f7fa", p: 3, minHeight: "100vh" }}>
      {/* Toggle & Breadcrumb */}
      <Button
        variant="outlined"
        size="small"
        onClick={() => setShowMenu((prev) => !prev)}
        sx={{ mb: 2 }}
      >
        {showMenu ? "Ẩn menu" : "Hiện menu"}
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

      {/* Step Manager */}
      {menuId && (
        <Box mt={1}>
          <StepManager menuId={menuId} />
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
        setLoading={setLoading}
        showSnackbar={showSnackbar}
      />

      {/* Global UI helpers */}
      <LoadingBackdrop open={loading} />
      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default Header;
