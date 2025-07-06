/* eslint-disable default-case */
import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { changLanguageApp } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Container,
  Stack,
  Grid,
  Divider,
  Box,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import MenuAccount from "../Section/MenuAccount";

const SubHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenuItem = (link) => {
    navigate(link);
  };

  const handleClickBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#64b9e5" }} className="sub-header">
        <Container>
          <Grid
            container
            sx={{ padding: "10px 2px" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sm={6} md={6}>
              <i
                className="fas fa-long-arrow-alt-left icon-goback"
                onClick={() => navigate(-1)}
              ></i>
            </Grid>
            <Grid item sm={6} md={6}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
                className="select-container"
              >
                <MenuAccount color="#fff" />

                <div>
                  <Button
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClickBtn}
                  >
                    <MenuIcon sx={{ fontSize: 25, color: "#fff" }} />
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
                    <MenuItem
                      onClick={() => handleClickMenuItem("/patient/account")}
                    >
                      Sửa bài
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClickMenuItem("/patient/booking")}
                    >
                      Xóa bài
                    </MenuItem>
                  </Menu>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.patient.isPatientLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
    processLogout: () => dispatch(actions.processPatientLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
