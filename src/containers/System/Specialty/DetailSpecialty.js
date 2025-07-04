import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import ButtonComponent from "../../../components/ButtonComponent";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import SpecialtyProfile from "./section/SpecialtyProfile";
import SpecialtyDetail from "./section/specialty-detail";
import _ from "lodash";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";

const DetailSpecialty = ({
  specialty,
  open,
  setOpen,
  isSuccess,
  updateSpecialty,
  clearStatus,
  enableEdit,
  setEnableEdit,
}) => {
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [specialtyName, setSpecialtyName] = useState("");
  //
  const [imgUpdate, setImgUpdate] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");

  useEffect(() => {
    setImage(specialty?.image?.url ? specialty.image.url : "");
    setDetail(specialty?.detail ? specialty.detail : "");
    setClinicName(specialty?.clinic?.name ? specialty.clinic.name : "");
    setSpecialtyName(specialty?.name ? specialty.name : "");
  }, [specialty]);

  const handleSave = () => {
    if (!specialty) return;
    const data = {
      image: imgUpdate,
      detail,
    };
    updateSpecialty(specialty._id, data);
  };
  const handleClose = () => {
    setOpen(false);
    setImage("");
    setDetail("");
    setPreviewImgUrl("");
    setEnableEdit(false);
    setImgUpdate(null);
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
              title="Chi tiết chuyên khoa"
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
                    <SpecialtyProfile
                      name={specialtyName}
                      image={image}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      clinic={clinicName}
                      enableEdit={enableEdit}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <SpecialtyDetail
                          clinicName={clinicName}
                          specialtyName={specialtyName}
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
                    <PermissionsGate scopes={[scopes.SPECIALTY_UPDATE]}>
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
    updateSpecialty: (id, data) =>
      dispatch(actions.updateSpecialtyAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
