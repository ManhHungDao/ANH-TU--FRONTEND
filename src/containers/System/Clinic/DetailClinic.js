import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import ButtonComponent from "../../../components/ButtonComponent";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import _ from "lodash";
import ClinicProfile from "./Section/ClinicProfile";
import { ClinicDetail } from "./Section/clinic-details";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";
import "./style.scss";

const DetailClinic = ({
  clinic,
  open,
  setOpen,
  updateClinic,
  enableEdit,
  setEnableEdit,
}) => {
  const [address, setAddress] = useState({
    detail: "",
    province: "",
  });
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [detail, setDetail] = useState("");
  const [views, setViews] = useState(0);
  const [imgUpdate, setImgUpdate] = useState(null);
  const [logoUpdate, setLogoUpdate] = useState(null);
  const [errors, setErrors] = useState({});
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [previewLogoUrl, setPreviewLogoUrl] = useState("");

  useEffect(() => {
    setAddress({
      province: clinic?.address?.province ? clinic.address?.province : "",
      detail: clinic?.address?.detail ? clinic.address?.detail : "",
    });
    setImage(clinic?.image ? clinic.image : "");
    setLogo(clinic?.logo ? clinic.logo : "");
    setName(clinic?.name ? clinic.name : "");
    setIntroduce(clinic?.introduce ? clinic.introduce : "");
    setDetail(clinic?.detail ? clinic.detail : "");
    setViews(clinic?.views ? clinic.views : "");
    setCoordinates({
      lat: clinic?.address?.lat ? clinic?.address?.lat : null,
      lng: clinic?.address?.lng ? clinic?.address?.lng : null,
    });
  }, [clinic]);

  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!address.detail) errors.address = "Địa chỉ không được bỏ trống";
    if (!detail) errors.detail = "Chi tiết không được bỏ trống";
    if (!introduce) errors.introduce = "Mô tả không được bỏ trống";
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
      detail,
      image: imgUpdate ? imgUpdate : null,
      logo: logoUpdate ? logoUpdate : null,
      name,
      introduce,
      address: {
        detail: address.detail,
        province: address.province,
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    };
    updateClinic(clinic.id, data);
  };
  const handleClose = () => {
    setOpen(false);
    setAddress({});
    setImage("");
    setLogo("");
    setName("");
    setIntroduce("");
    setDetail("");
    setViews("");
    setErrors("");
    setCoordinates({
      lat: null,
      lng: null,
    });
    setPreviewImgUrl("");
    setPreviewLogoUrl("");
    setImgUpdate("");
    setLogoUpdate("");
    setEnableEdit(false);
  };
  const style = {
    position: "absolute",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: enableEdit ? "80vh" : "fit-content",
    maxHeight: "80vh",
    overflowY: "scroll",
    top: 0,
    bottom: 0,
    margin: "auto",
    left: 0,
    right: 0,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box m="20px">
            <Header
              title="Chi tiết phòng khám"
              isShowSwitch={true}
              titleSwich={"Chỉnh sửa"}
              isChecked={enableEdit}
              setChecked={setEnableEdit}
            />
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Container maxWidth="lg">
              <Stack>
                <Grid container spacing={3}>
                  <Grid
                    xs={12}
                    md={enableEdit ? 6 : 12}
                    lg={enableEdit ? 4 : 12}
                  >
                    <ClinicProfile
                      name={name}
                      address={address}
                      image={image}
                      logo={logo}
                      setImgUpdate={setImgUpdate}
                      setLogoUpdate={setLogoUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      previewLogoUrl={previewLogoUrl}
                      setPreviewLogoUrl={setPreviewLogoUrl}
                      views={views}
                      enableEdit={enableEdit}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <ClinicDetail
                          name={name}
                          setName={setName}
                          detail={detail}
                          setDetail={setDetail}
                          introduce={introduce}
                          setIntroduce={setIntroduce}
                          address={address}
                          setAddress={setAddress}
                          errors={errors}
                          setCoordinates={setCoordinates}
                        />
                      </Grid>
                      <Grid xs={12} md={12} lg={12}>
                        <Card>
                          <CardHeader title="Thông tin chi tiết" />
                          <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ m: -1.5 }}>
                              <Grid container spacing={3}>
                                <Grid>
                                  <CKEditorFieldBasic
                                    value={detail}
                                    onChange={setDetail}
                                    isError={errors.detail ? true : false}
                                    errorText={errors.detail}
                                    title="Chi tiết"
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                  {enableEdit && (
                    <PermissionsGate scopes={[scopes.CLINIC_UPDATE]}>
                      <ButtonComponent
                        content="Lưu"
                        handleClick={handleSave}
                        bgcolor="#94e2cd"
                        color="#141414"
                        hoverBgColor="#1e5245"
                        hoverColor="#fff"
                      />
                    </PermissionsGate>
                  )}
                </Grid>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClinic: (id, data) => dispatch(actions.updateClinicAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
