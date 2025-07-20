import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import MenuTree from "./MenuTree";
import InfoBoardView from "./InfoBoardView";
import StepList from "./StepList";
import StepDialog from "./StepDialog";

import { fetchMenus } from "./api/menuApi";
import { getInfoBoardByMenu } from "./api/infoBoardApi";
import { getStepsByInfoBoard } from "./api/stepApi";

export default function StepManager() {
  const [menus, setMenus] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [infoBoard, setInfoBoard] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openStepDialog, setOpenStepDialog] = useState(false);

  // Load toàn bộ menu từ API khi load trang
  useEffect(() => {
    fetchMenus().then((res) => {
      setMenus(res.data);
      setMenuTree(buildTree(res.data));
    });
  }, []);

  // Build tree theo cấp cha-con
  const buildTree = (flatList) => {
    const map = {};
    const roots = [];

    flatList.forEach((item) => {
      map[item._id] = { ...item, children: [] };
    });

    flatList.forEach((item) => {
      if (item.parent) {
        map[item.parent]?.children.push(map[item._id]);
      } else {
        roots.push(map[item._id]);
      }
    });

    return roots;
  };

  // Khi người dùng chọn menu
  const handleSelectMenu = async (menuId) => {
    setLoading(true);
    setSelectedMenu(menuId);

    try {
      const boardRes = await getInfoBoardByMenu(menuId);
      const board = boardRes.data;
      setInfoBoard(board);

      const stepsRes = await getStepsByInfoBoard(board._id);
      setSteps(stepsRes.data);
    } catch (err) {
      setInfoBoard(null);
      setSteps([]);
    }

    setLoading(false);
  };

  const handleStepAdded = (newStep) => {
    setSteps((prev) => [...prev, newStep]);
  };

  return (
    <Grid container spacing={2}>
      {/* Menu bên trái */}
      <Grid item xs={3}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6">Danh mục</Typography>
          <MenuTree menus={menuTree} onSelect={handleSelectMenu} />
        </Paper>
      </Grid>

      {/* Nội dung bên phải */}
      <Grid item xs={9}>
        <Paper sx={{ p: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : infoBoard ? (
            <>
              <Typography variant="h5" gutterBottom>
                {infoBoard.description || "Chưa có mô tả bảng thông tin"}
              </Typography>

              <Box mb={2}>
                <Button
                  variant="contained"
                  onClick={() => setOpenStepDialog(true)}
                >
                  Thêm bước mới
                </Button>
              </Box>

              <StepList
                steps={steps}
                onStepUpdated={(updated) =>
                  setSteps((prev) =>
                    prev.map((s) => (s._id === updated._id ? updated : s))
                  )
                }
                onStepDeleted={(deletedId) =>
                  setSteps((prev) => prev.filter((s) => s._id !== deletedId))
                }
              />
            </>
          ) : (
            <Typography>Chọn một menu để xem thông tin.</Typography>
          )}
        </Paper>
      </Grid>

      {/* Dialog thêm bước */}
      {infoBoard && (
        <StepDialog
          open={openStepDialog}
          onClose={() => setOpenStepDialog(false)}
          infoBoardId={infoBoard._id}
          onStepAdded={handleStepAdded}
        />
      )}
    </Grid>
  );
}
