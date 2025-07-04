import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const SetRole = ({ roleId, setRoleId }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const options = ["Admin", "Manager", "Doctor"];
  const roleIdList = ["R1", "R2", "R3"];

  useEffect(() => {
    if (roleId === "R1") setSelectedIndex(0);
    else if (roleId === "R2") setSelectedIndex(1);
    else if (roleId === "R3") setSelectedIndex(2);
  }, [roleId]);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setRoleId(roleIdList[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <ButtonGroup variant="outlined" ref={anchorRef}>
        <Button>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      //   disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default SetRole;
