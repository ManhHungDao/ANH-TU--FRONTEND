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
import PacketDetail from "./Section/packet-detail";
import _ from "lodash";
import PacketProfile from "./Section/PacketProfile";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";

const DetailPacket = ({
  packet,
  open,
  setOpen,
  updatePacket,
  enableEdit,
  setEnableEdit,
  allcodes,
  fetchAllcode,
}) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [detail, setDetail] = useState("");
  const [imgUpdate, setImgUpdate] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [type, setType] = useState("");
  const [clinic, setClinic] = useState("");

  const [errors, setErrors] = useState({});
  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    if (enableEdit === true) fetchAllcode();
  }, [enableEdit]);
  useEffect(() => {
    setDataSelect(
      allcodes.map((e) => ({ id: e._id, name: e.valueVI, type: e.type }))
    );
  }, [allcodes]);

  useEffect(() => {
    if (!_.isEmpty(packet)) {
      setImage(packet?.image ? packet.image : "");
      setName(packet?.name ? packet.name : "");
      setIntroduce(packet?.introduce ? packet.introduce : "");
      setDetail(packet?.detail ? packet.detail : "");
      setPrice({
        value: packet?.price.id ? packet.price.id : "",
        label: packet?.price.name ? packet.price.name : "",
      });
      setPayment({
        value: packet?.payment.id ? packet.payment.id : "",
        label: packet?.payment.name ? packet.payment.name : "",
      });
      setClinic(packet?.clinic.name ? packet.clinic.name : "");
      setType(packet?.type?.typeCode?.name);
      setSpecialty(packet?.type?.specialty?.name);
    }
  }, [packet]);

  const checkValidate = () => {
    let errors = {};
    if (!introduce) errors.introduce = "Giới thiệu không được bỏ trống";
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!detail) errors.detail = "Chi tiết không được bỏ trống";
    if (!image) errors.image = "Chưa tải hình ảnh";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
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
      type: {
        typeCode: {
          id: type.value ? type.value : null,
          name: type.label ? type.label : null,
        },
        specialty: {
          id: specialty.value ? specialty.value : null,
          name: specialty.label ? specialty.label : null,
        },
      },
      detail,
      price: {
        id: price.value ? price.value : null,
        name: price.label ? price.label : null,
      },
      payment: {
        id: payment.value ? payment.value : null,
        name: payment.label ? payment.label : null,
      },
      image: imgUpdate ? imgUpdate : null,
      name,
      introduce,
    };
    updatePacket(packet.id, data);
  };
  const handleClose = () => {
    setOpen(false);
    setClinic("");
    setSpecialty("");
    setPrice("");
    setPayment("");
    setImage("");
    setName("");
    setIntroduce("");
    setDetail("");
    setErrors("");
    setPreviewImgUrl("");
    setImgUpdate("");
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
              title="Chi tiết gói khám"
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
                    <PacketProfile
                      name={name}
                      image={image}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      enableEdit={enableEdit}
                      clinic={clinic}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <PacketDetail
                          name={name}
                          setName={setName}
                          clinic={clinic}
                          setSpecialty={setSpecialty}
                          specialty={specialty}
                          price={price}
                          setPrice={setPrice}
                          payment={payment}
                          setPayment={setPayment}
                          introduce={introduce}
                          setIntroduce={setIntroduce}
                          type={type}
                          setType={setType}
                          errors={errors}
                          dataSelect={dataSelect}
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
                <Grid
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ mt: 2 }}
                  xs={12}
                  md={12}
                >
                  {enableEdit && (
                    <PermissionsGate scopes={[scopes.PACKET_UPDATE]}>
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
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePacket: (id, data) => dispatch(actions.updatePacketAction(id, data)),
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPacket);
