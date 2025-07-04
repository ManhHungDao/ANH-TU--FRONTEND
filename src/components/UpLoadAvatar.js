import React from "react";
import Lightbox from "react-image-lightbox";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { CommonUtils } from "../utils";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const UpLoadAvatar = ({
  setImg,
  preWidth,
  preHeight,
  borderRadius,
  backgroundSize,
  content,
  image,
  isDetail,
  setImgUpdate,
  isSuccess,
  previewImgUrl,
  setPreviewImgUrl,
  isError,
  errorText,
  disableEdit,
}) => {
  const [openPreImg, setOpenPreImg] = useState(false);
  // const [previewImgUrl, setPreviewImgUrl] = useState("");
  useEffect(() => {
    if (isSuccess === true) setPreviewImgUrl("");
  }, [isSuccess]);
  const handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      const url = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      if (setImg) setImg(base64);
      if (setPreviewImgUrl) setPreviewImgUrl(url);
      if (setImgUpdate) setImgUpdate(base64);
    }
  };
  const openReviewImage = () => {
    if (!previewImgUrl) return;
    setOpenPreImg(true);
  };
  const style = {
    width: preWidth ? preWidth : "200px",
    height: preHeight ? preHeight : "200px",
    borderRadius: borderRadius ? borderRadius : "100vmax",
    border: isError ? "2px solid #dc3545" : "2px solid #ddd",
    cursor: "pointer",
    background: "center center no-repeat",
    backgroundSize: backgroundSize ? backgroundSize : "cover",
    backgroundImage: `url(${previewImgUrl ? previewImgUrl : image})`,
  };

  return (
    <>
      <FormControl error={isError}>
        {isDetail ? (
          <div
            className="detail-avatar preview-img-container mb-3"
            style={{ position: "relative" }}
          >
            <div className="preview-image" style={style}>
              <label
                style={{
                  position: "absolute",
                  right: "0px",
                  bottom: " -5px",
                }}
              >
                {!disableEdit && (
                  <>
                    <PhotoCamera />
                    <input
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                      onChange={(event) => handleOnChangeImage(event)}
                    />
                  </>
                )}
              </label>
            </div>
          </div>
        ) : (
          <div className="preview-img-container">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a1a4ab",
                color: "#141414",
                ":hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
              component="label"
              endIcon={<PhotoCamera />}
            >
              {content}
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(event) => handleOnChangeImage(event)}
              />
            </Button>
            <div
              className="preview-image"
              style={style}
              onClick={() => openReviewImage()}
            ></div>
          </div>
        )}
        {isError && (
          <FormHelperText>
            <div className="d-flex justify-content-center">{errorText}</div>
          </FormHelperText>
        )}
      </FormControl>
      {openPreImg && previewImgUrl && (
        <Lightbox
          mainSrc={previewImgUrl}
          onCloseRequest={() => setOpenPreImg(false)}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpLoadAvatar);
