import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ClinicProfile = ({
  name,
  address,
  image,
  setImage,
  logo,
  setLogo,
  setImgUpdate,
  setLogoUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  previewLogoUrl,
  setPreviewLogoUrl,
  views,
  enableEdit,
}) => {
  const isMobile = "";
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
              preWidth="300px"
              preHeight="200px"
              borderRadius="0px"
              backgroundSize="cover"
              image={image}
              isDetail={true}
              setImgUpdate={setImgUpdate}
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              disableEdit={!enableEdit}
            />
            <div
              className="d-flex justify-content-center mb-3"
              style={{ padding: "0px !important" }}
            >
              <div
                className="logo"
                style={{
                  position: "absolute",
                  top: isMobile ? "335px" : "300px",
                }}
              >
                <UpLoadAvatar
                  setImg={setLogo}
                  isDetail={true}
                  preWidth="80px"
                  preHeight="80px"
                  image={logo}
                  setImgUpdate={setLogoUpdate}
                  previewImgUrl={previewLogoUrl}
                  setPreviewImgUrl={setPreviewLogoUrl}
                  disableEdit={!enableEdit}
                />
              </div>
            </div>
            <Typography gutterBottom variant="h5">
              {name ? name : ""}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                className="clinic-profile__detail--text"
                color="text.secondary"
                variant="body2"
              >
                <VisibilityIcon />
                Lượt truy cập: {views ? views : 0}
              </Typography>
              <Typography
                // className="clinic-profile__detail--text"
                color="text.secondary"
                variant="body2"
              >
                <LocationOnIcon />
                <span style={{ marginLeft: "5px" }}>
                  {address.detail ? address.detail : ""}
                </span>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ClinicProfile;
