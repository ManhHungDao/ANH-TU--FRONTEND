/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const MenuAccount = ({ color }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenuItem = (link) => {
    setOpen(false);
    navigate(link);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickBtn}
      >
        {color ? (
          <PersonRoundedIcon sx={{ fontSize: 25, color: "#fff" }} />
        ) : (
          <PersonRoundedIcon sx={{ fontSize: 25 }} />
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClickMenuItem("/file/add")}>
          Thêm tập tin
        </MenuItem>
        <MenuItem onClick={() => handleClickMenuItem("/patient/booking")}>
          Đơn đặt lịch
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuAccount;
