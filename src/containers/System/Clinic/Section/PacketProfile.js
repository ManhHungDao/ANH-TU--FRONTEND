import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

const PacketProfile = ({
  name,
  image,
  setImgUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  enableEdit,
  clinic,
}) => {
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
            <Typography gutterBottom variant="h5">
              {name ? name : ""}
            </Typography>
            <Box>
              <Typography
                color="text.secondary"
                variant="body2"
                className="d-flex align-items-end"
              >
                <HomeWorkOutlinedIcon />
                <span style={{ marginLeft: "5px" }}>
                  Phòng khám: {clinic ? clinic : ""}
                </span>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default PacketProfile;
