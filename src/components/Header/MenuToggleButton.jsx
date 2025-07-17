import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MenuToggleButton = ({ showMenu, setShowMenu }) => {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => setShowMenu(!showMenu)}
      sx={{ ml: 1, minWidth: 100 }}
    >
      {showMenu ? "Ẩn menu" : "Hiện menu"}
    </Button>
  );
};

export default MenuToggleButton;
