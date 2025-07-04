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
import HandbookProfile from "./section/HandbookProfile";
import { HandbookDetail } from "./section/HandbookDetail";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";
import _ from "lodash";

const DetailHandbook = ({
  handbook,
  listSpecialtyInClinic,
  getSpecialtyByClinicId,
  getListSpecialty,
  listSpecialty,
  open,
  setOpen,
  enableEdit,
  setEnableEdit,
  updateHandbook,
}) => {
  const [detail, setDetail] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [imgUpdate, setImgUpdate] = useState(null);
  const [image, setImage] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [dataSpecialty, setDataSpecialty] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (enableEdit === true) {
      if (handbook && handbook.clinic && handbook.clinic.id) {
        getSpecialtyByClinicId(handbook.clinic.id);
      } else {
        getListSpecialty();
      }
    }
  }, [enableEdit]);
  useEffect(() => {
    if (listSpecialty && listSpecialty.length > 0)
      setDataSpecialty(
        listSpecialty.map((e) => ({
          id: e.key,
          name: e.name,
        }))
      );
    else if (listSpecialtyInClinic && listSpecialtyInClinic.length > 0)
      setDataSpecialty(
        listSpecialty.map((e) => ({
          id: e.key,
          name: e.name,
        }))
      );
  }, [listSpecialty, listSpecialtyInClinic]);

  useEffect(() => {
    if (handbook.specialty) {
      setSpecialty({
        value: handbook.specialty.id,
        label: handbook.specialty.name,
      });
    }
    if (handbook.clinic) {
      setClinic({
        value: handbook.clinic.id,
        label: handbook.clinic.name,
      });
    }
    setDetail(handbook?.detail ? handbook.detail : "");
    setImage(handbook?.image ? handbook.image : "");
    setName(handbook?.name ? handbook.name : "");
    setNote(handbook?.note ? handbook.note : "");
  }, [handbook]);
  const handleClose = () => {
    setOpen(false);
    setImage("");
    setName("");
    setNote("");
    setDetail("");
    setErrors("");
    setPreviewImgUrl("");
    setImgUpdate("");
    setEnableEdit(false);
  };

  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!detail) errors.detail = "Chi tiết không được bỏ trống";
    if (!image) errors.image = "Chưa tải hình ảnh";
    if (!note) errors.note = "Ghi chú không được bỏ trống";
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
    const data = {
      name,
      image: imgUpdate ? imgUpdate : null,
      detail,
      note,
      clinic,
      specialty: {
        id: specialty.value,
        name: specialty.label,
      },
    };
    updateHandbook(handbook._id, data);
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
              title="Chi tiết cẩm nang"
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
                    <HandbookProfile
                      name={name}
                      image={image}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      enableEdit={enableEdit}
                      specialty={specialty}
                      clinic={clinic}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <HandbookDetail
                          name={name}
                          setName={setName}
                          detail={detail}
                          setDetail={setDetail}
                          note={note}
                          setNote={setNote}
                          dataSpecialty={dataSpecialty}
                          errors={errors}
                          specialty={specialty}
                          setSpecialty={setSpecialty}
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
                    <PermissionsGate scopes={[scopes.HANDBOOK_UPDATE]}>
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
  return {
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
    listSpecialty: state.client.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateClinic: (id, data) => dispatch(actions.updateClinicAction(id, data)),
    getSpecialtyByClinicId: (id) =>
      dispatch(actions.getSpecialtyByClinicIdAction(id)),
    getListSpecialty: () =>
      dispatch(actions.getListSpecialtyHomePatientAction("")),
    updateHandbook: (id, data) =>
      dispatch(actions.updateHandbookAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
