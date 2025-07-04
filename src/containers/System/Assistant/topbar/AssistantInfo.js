import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Header from "../../../../components/Header.jsx";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { getSingleAssistant } from "../../../../services/assistantService.js";
import { toast } from "react-toastify";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const AssistantInfo = ({ userInfo }) => {
  const [data, setData] = useState("");

  const getDataAssistant = async (id) => {
    try {
      const res = await getSingleAssistant(id);
      if (res && res.success) {
        setData(res.assistant);
      } else {
        toast.error("Lấy thông tin thất bại");
      }
    } catch {
      toast.error("Lấy thông tin thất bại");
    }
  };
  useEffect(() => {
    getDataAssistant(userInfo._id);
  }, []);

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
                <Box
                  width="100%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor="#2e7c67"
                  borderRadius="4px"
                >
                  <PersonIcon />
                  <Typography
                    color="#141414"
                    sx={{ ml: "5px", textTransform: "uppercase" }}
                  >
                    Assistant - {data?.name ? data.name : ""}
                  </Typography>
                </Box>
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
                  </Box>
                </Grid>
                <Grid item md={4} sm={12}>
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
                      <MedicalServicesIcon />
                      {data?.doctor?.id?.name ? data?.doctor?.id?.name : ""}
                    </Typography>
                    <Typography
                      className="account-profile__detail"
                      color="text.secondary"
                      variant="body2"
                    >
                      <HomeRepairServiceIcon />
                      {data?.doctor?.id?.detail?.clinic?.name
                        ? data?.doctor?.id?.detail?.clinic.name
                        : ""}
                      -&nbsp;
                      {data?.doctor?.id?.detail?.specialty?.name
                        ? data?.doctor?.id?.detail?.specialty.name
                        : ""}
                    </Typography>
                  </Box>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AssistantInfo);
