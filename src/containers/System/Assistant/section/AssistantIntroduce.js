import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PermissionsGate from "../../../../hoc/PermissionsGate";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { scopes } from "../../../../utils";
import ConfirmModal from "../../../../components/confirmModal/ConfirmModal";
import { resetPassword } from "../../../../services/assistantService";
import { toast } from "react-toastify";
const AssistantIntroduce = ({
  name,
  email,
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
  doctor,
  gender,
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirmResetPassword = async () => {
    try {
      const res = await resetPassword({ email });
      if (res && res.success) {
        setOpen(false);
        toast.success("Đặt lại mật khẩu thành công");
      } else {
        setOpen(false);
        toast.error("Đặt lại mật khẩu thất bại");
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    }
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
                  Assistant - {name}
                </Typography>
              </Box>
            </Typography>
            <Grid container spacing={1} display="flex" justifyContent="center">
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
                </Box>
              </Grid>

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
                    <MedicalServicesIcon />
                    {doctor.label}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AssistantIntroduce);
