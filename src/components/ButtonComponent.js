import React from "react";
import Button from "@mui/material/Button";

const ButtonComponent = ({
  content,
  handleClick,
  bgcolor,
  color,
  hoverBgColor,
  hoverColor,
  variant,
  disabled,
}) => {
  return (
    <Button
      disabled={disabled}
      variant={variant ? variant : "contained"}
      sx={{
        backgroundColor: bgcolor,
        color: color,
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        ":hover": {
          bgcolor: hoverBgColor,
          color: hoverColor,
        },
      }}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
