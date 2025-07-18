import React from "react";
import { Typography, Paper } from "@mui/material";

export default function InfoBoardView({ infoBoard }) {
  if (!infoBoard) return null;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Bảng thông tin
      </Typography>
      <Typography variant="body1">
        {infoBoard.description || "Chưa có mô tả..."}
      </Typography>
    </Paper>
  );
}
