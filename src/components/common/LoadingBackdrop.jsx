import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
