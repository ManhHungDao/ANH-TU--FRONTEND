import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import UpLoadAvatar from "../../../../components/UpLoadAvatar";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";

const HandbookProfile = ({
  name,
  image,
  setImage,
  setImgUpdate,
  previewImgUrl,
  setPreviewImgUrl,
  clinic,
  enableEdit,
  specialty,
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

            <Typography gutterBottom variant="h5">
              {name ? name : ""}
            </Typography>
            <Box>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {clinic && clinic?.label ? (
                  <>
                    <HomeWorkOutlinedIcon />
                    <span style={{ marginLeft: "5px" }}>
                      Phòng khám: {clinic?.label ? clinic.label : ""} &nbsp;-
                      &nbsp; {specialty?.label ? specialty.label : ""}
                    </span>
                  </>
                ) : (
                  <>
                    <HomeWorkOutlinedIcon />
                    <span style={{ marginLeft: "5px" }}>
                      Chuyên khoa:&nbsp;
                      {specialty?.label ? specialty.label : ""}
                    </span>
                  </>
                )}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default HandbookProfile;
