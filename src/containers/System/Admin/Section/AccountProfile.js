import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Divider,
  Button,
} from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";
import SetRole from "./SetRole";
import { scopes } from "../../../../utils";
import PermissionsGate from "../../../../hoc/PermissionsGate";
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

const AccountProfile = ({
  name,
  email,
  roleId,
  setRoleId,
  address,
  image,
  setImage,
  phone,
  setImgUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  enableEdit,
  clinic,
  specialty,
  introduce,
  resetPasswordAction,
  resetPassSuccess,
  clearUserStatus,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (resetPassSuccess === true) {
      setOpen(false);
      clearUserStatus();
    }
  }, [resetPassSuccess]);
  const handleConfirmResetPassword = () => {
    resetPasswordAction({ email });
  };
  return (
    <>
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
              setImg={setImage}
              isDetail={true}
              preWidth="80px"
              preHeight="80px"
              image={image}
              setImgUpdate={setImgUpdate}
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              disableEdit={!enableEdit}
            />
            <Typography gutterBottom variant="h5">
              {role &&
                role.map((i) => {
                  if (i.id === roleId)
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
                          {i.name} - {name ? name : ""}
                        </Typography>
                      </Box>
                    );
                })}
            </Typography>
            <Grid container spacing={2} display="flex" justifyContent="center">
              <Grid item md={enableEdit ? 12 : 4} sm={12}>
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
                    {email ? email : ""}
                  </Typography>
                  <Typography
                    className="account-profile__detail"
                    color="text.secondary"
                    variant="body2"
                  >
                    <PhoneIcon />
                    {phone ? phone : ""}
                  </Typography>
                  <Typography
                    // className="clinic-profile__detail--text"
                    color="text.secondary"
                    variant="body2"
                  >
                    <LocationOnIcon />
                    <span style={{ marginLeft: "5px" }}>
                      {address?.detail ? address.detail : ""}
                    </span>
                  </Typography>
                  <Typography
                    className="account-profile__detail"
                    color="text.secondary"
                    variant="body2"
                  >
                    <HomeRepairServiceIcon />
                    {clinic?.label ? clinic.label : ""} -&nbsp;
                    {specialty?.label ? specialty.label : ""}
                  </Typography>
                </Box>
              </Grid>
              {!enableEdit && (
                <Grid item md={4} sm={12}>
                  <Typography color="text.secondary" variant="body2">
                    <AccountCircleIcon />
                    <span style={{ marginLeft: "5px" }}>
                      {introduce ? introduce : ""}
                    </span>
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
        {enableEdit && (
          <>
            <PermissionsGate scopes={[scopes.USER_UPDATE]}>
              <Divider />
              <CardActions
                sx={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setOpen(true)}
                  sx={{
                    pt: "6px",
                    pb: "6px",
                  }}
                >
                  Đặt lại mật khẩu
                </Button>
                <SetRole roleId={roleId} setRoleId={setRoleId} />
              </CardActions>
            </PermissionsGate>
          </>
        )}
      </Card>
      {open && (
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          title="Xác nhận đặt lại mật khẩu người dùng"
          content={`${name}`}
          type="CONFIRM"
          confirmFunc={handleConfirmResetPassword}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    resetPassSuccess: state.user.resetPassSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPasswordAction: (email) =>
      dispatch(actions.resetPasswordAction(email)),
    clearUserStatus: () => dispatch(actions.clearUserStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
