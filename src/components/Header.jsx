import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

function Header({ menuItems, setMenuItems }) {
  const handleAddMenu = () => {
    const newItem = prompt("Nhập tên menu:");
    if (newItem) setMenuItems([...menuItems, newItem]);
  };

  const handleDeleteMenu = (index) => {
    const newItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(newItems);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#eeeeee", boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            sx={{ color: "black", borderColor: "black" }}
            onClick={handleAddMenu}
            startIcon={<AddIcon />}
          >
            Thêm Menu
          </Button>
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            px: 2,
            py: 1,
            bgcolor: "#eeeeee",
            borderRadius: 1,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          {menuItems.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "white",
                px: 2,
                py: 1,
                borderRadius: 2,
                boxShadow: 1,
                color: "black",
                borderColor: "black",
              }}
            >
              <Typography variant="body1" sx={{ mr: 1 }}>
                {item}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleDeleteMenu(i)}
                sx={{ p: 0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
}

export default Header;
