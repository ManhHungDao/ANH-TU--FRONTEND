import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "react-image-lightbox/style.css";
import { toast } from "react-toastify";
import _ from "lodash";
import { Box, Grid, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import AutocompleteAddress from "../../../components/Input/AutocompleteAddress";

import SubHeader from "../../HomePage/Section/SubHeader.js";
import "./Style.scss";
const Addfile = ({ createClinicAction, isSuccess, message, clearStatus }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState({ detail: "", province: "" });
  const [introduce, setIntroduce] = useState("");
  const [province, setProvince] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [previewLogoUrl, setPreviewLogoUrl] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isSuccess === true) {
      setContent("");
      setImage("");
      setLogo("");
      setName("");
      setAddress({ detail: "", province: "" });
      setIntroduce("");
      setProvince("");
      setCoordinates({
        lat: null,
        lng: null,
      });
      setPreviewLogoUrl("");
      setPreviewImgUrl("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    clearStatus();
  }, [isSuccess]);
  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!address) errors.address = "Địa chỉ không được bỏ trống";
    if (!content) errors.content = "Chi tiết không được bỏ trống";
    if (!introduce) errors.introduce = "Giới thiệu không được bỏ trống";
    if (!image) errors.image = "Chưa tải hình ảnh";
    if (!logo) errors.logo = "Chưa tải hình đại diện";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  const handleSave = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let data = {
      detail: content,
      image,
      logo,
      name,
      introduce,
      address: {
        province: address.province ? address.province : null,
        detail: address.detail ? address.detail : null,
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    };
    createClinicAction(data);
  };
  return (
    <>
      <SubHeader />
      <Box m="20px">
        <Header title="Thêm Mới Phòng Khám" subtitle="Quản lý phòng khám" />
        <Grid
          container
          spacing={2}
          // display="flex"
          // justifyContent="space-around"
          // alignItems="center"
        >
          <Grid item sx={{ mb: 2 }} xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Tên"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  error={errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <AutocompleteAddress
                  isErr={errors.address ? true : false}
                  errName={errors.address}
                  setAddress={setAddress}
                  setCoordinates={setCoordinates}
                  address={address}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <UpLoadAvatar
              content="Hình đại diện"
              borderRadius="5px"
              preWidth="400px"
              preHeight="200px"
              setImg={setLogo}
              backgroundSize="contain"
              setPreviewImgUrl={setPreviewLogoUrl}
              previewImgUrl={previewLogoUrl}
              isError={errors.logo ? true : false}
              errorText={errors.logo}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <UpLoadAvatar
              content="Hình nền"
              borderRadius="5px"
              preHeight="200px"
              preWidth="400px"
              setImg={setImage}
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              isError={errors.image ? true : false}
              errorText={errors.image}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <span className="detail__clinic--introduce">
              <CKEditorFieldBasic
                value={introduce}
                onChange={setIntroduce}
                title="Giới thiệu"
                isError={errors.introduce ? true : false}
                errorText={errors.introduce}
              />
            </span>
          </Grid>
          <Grid item xs={12} md={12}>
            <CKEditorFieldBasic
              value={content}
              onChange={setContent}
              title="Chi tiết"
              isError={errors.content ? true : false}
              errorText={errors.content}
            />
          </Grid>
          <Grid xs={12} md={12} item display="flex" justifyContent="flex-end">
            <ButtonComponent
              content="Lưu"
              handleClick={handleSave}
              bgcolor="#94e2cd"
              color="#141414"
              hoverBgColor="#1e5245"
              hoverColor="#fff"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createClinicAction: (data) => dispatch(actions.createClinicAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addfile);
