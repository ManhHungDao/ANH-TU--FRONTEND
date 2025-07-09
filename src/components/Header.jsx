import { useState } from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ModalAddFiles from "./modal/ModalAddFiles";

const Header = ({ title, titleBtn, setChecked, open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  const handleOnClose = () => {
    setOpen(!open);
  };
  return (
    <>
      <Box mb="30px">
        <Grid container>
          <Grid item xs={12} md={6} direction="column">
            <Typography
              variant="h4"
              color="#141414"
              fontWeight="bold"
              sx={{ m: "0 0 5px 0", textTransform: "capitalize" }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{ height: "fit-content" }}
          >
            <Button
              sx={{
                backgroundColor: "rgb(33, 150, 243)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "light",
                padding: "5px 10px",
                ":hover": {
                  bgcolor: "rgb(151, 200, 240)",
                },
                fontWeight: "bold",
              }}
              variant="contained"
              // startIcon={<AddIcon />}
              onClick={onClick}
            >
              {titleBtn}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {open && <ModalAddFiles open={open} onClose={handleOnClose} />}
    </>
  );
};

export default Header;
