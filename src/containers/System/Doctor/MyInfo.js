import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header.jsx";
import AccountProfile from "../Admin/Section/AccountProfile";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyInfo = ({ userInfo, user, getSingleUserAction }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    getSingleUserAction(userInfo._id);
  }, [userInfo]);

  useEffect(() => {
    setData(user);
  }, [user]);
  const role = [
    {
      id: "R0",
      name: "admin",
      icon: <SecurityOutlinedIcon />,
      bgcolor: "#4cceac",
    },
    {
      id: "R1",
      name: "admin",
      icon: <SecurityOutlinedIcon />,
      bgcolor: "#4cceac",
    },
    {
      id: "R2",
      name: "Manager",
      icon: <AdminPanelSettingsOutlinedIcon />,
      bgcolor: "#2e7c67",
    },
    {
      id: "R3",
      name: "doctor",
      icon: <PersonIcon />,
      bgcolor: "#2e7c67",
    },
  ];
  return (
    <>
      <Box m="20px">
        <Header title="Thông tin cá nhân" />
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <UpLoadAvatar
                isDetail={true}
                preWidth="80px"
                preHeight="80px"
                image={data?.image?.url}
                disableEdit={true}
              />
              <Typography gutterBottom variant="h5">
                {role &&
                  role.map((i) => {
                    if (i.id === data.roleId)
                      return (
                        <Box
                          width="100%"
                          m="0 auto"
                          p="5px"
                          display="flex"
                          justifyContent="center"
                          backgroundColor={i.bgcolor}
                          borderRadius="4px"
                          key={i.id}
                        >
                          {i.icon}
                          <Typography
                            color="#141414"
                            sx={{ ml: "5px", textTransform: "uppercase" }}
                          >
                            {i.name} - {data.name ? data.name : ""}
                          </Typography>
                        </Box>
                      );
                  })}
              </Typography>
              <Grid
                container
                spacing={2}
                display="flex"
                justifyContent="center"
              >
                <Grid item md={4} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography
                      className="account-profile__detail"
                      color="text.secondary"
                      variant="body2"
                    >
                      <EmailIcon />
                      {data.email ? data.email : ""}
                    </Typography>
                    <Typography
                      className="account-profile__detail"
                      color="text.secondary"
                      variant="body2"
                    >
                      <PhoneIcon />
                      {data.phone ? data.phone : ""}
                    </Typography>
                    <Typography
                      // className="clinic-profile__detail--text"
                      color="text.secondary"
                      variant="body2"
                    >
                      <LocationOnIcon />
                      <span style={{ marginLeft: "5px" }}>
                        {data.address?.detail ? data.address.detail : ""}
                      </span>
                    </Typography>
                    <Typography
                      className="account-profile__detail"
                      color="text.secondary"
                      variant="body2"
                    >
                      <HomeRepairServiceIcon />
                      {data?.detail?.clinic?.name
                        ? data?.detail?.clinic.name
                        : ""}{" "}
                      -&nbsp;
                      {data?.detail?.specialty?.name
                        ? data?.detail?.specialty.name
                        : ""}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={4} sm={12}>
                  <Typography color="text.secondary" variant="body2">
                    <AccountCircleIcon />
                    <span style={{ marginLeft: "5px" }}>
                      {data?.detail?.introduce ? data?.detail.introduce : ""}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    user: state.admin.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleUserAction: (id) => dispatch(actions.getSingleUserAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyInfo);
