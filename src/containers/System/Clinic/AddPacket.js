import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import Grid from "@mui/material/Grid";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import InputSelect from "../../../components/Input/InputSelect";
import _ from "lodash";
const AddPacket = ({
  fetchAllcode,
  allcodes,
  listClinic,
  getListClinic,
  getSpecialtyByClinicId,
  listSpecialtyInClinic,
  isSuccess,
  clearStatus,
  createPacket,
}) => {
  const smScreen = null;
  const [content, setContent] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState("");
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [listClinicSelect, setListClinicSelect] = useState([]);
  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    fetchAllcode();
    getListClinic();
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      setName("");
      setImage("");
      setClinic("");
      setSpecialty("");
      setPrice("");
      setPayment("");
      setIntroduce("");
      setContent("");
      setPreviewImgUrl("");
      setType("");
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    clearStatus();
  }, [isSuccess]);
  useEffect(() => {
    setListClinicSelect(
      listClinic.map((e) => {
        return {
          id: e._id,
          name: e.name,
        };
      })
    );
    setDataSelect(
      allcodes.map((e) => ({ id: e._id, name: e.valueVI, type: e.type }))
    );
  }, [listClinic, allcodes]);

  const checkValidate = () => {
    let errors = {};
    if (!introduce) errors.introduce = "Giới thiệu không được bỏ trống";
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!content) errors.content = "Chi tiết không được bỏ trống";
    if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    if (!image) errors.image = "Chưa tải hình ảnh";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
    if (!type) errors.type = "Chưa chọn loại gói khám";
    if (!specialty) errors.specialty = "Chưa chọn chuyên khoa";

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
      image,
      clinic: {
        id: clinic.value ? clinic.value : null,
        name: clinic.label ? clinic.label : null,
      },
      type: {
        id: type.value ? type.value : null,
        name: type.label ? type.label : null,
      },
      specialty: {
        id: specialty.value ? specialty.value : null,
        name: specialty.label ? specialty.label : null,
      },
      price: {
        id: price.value ? price.value : null,
        name: price.label ? price.label : null,
      },
      payment: {
        id: payment.value ? payment.value : null,
        name: payment.label ? payment.label : null,
      },
      introduce,
      detail: content,
    };
    createPacket(data);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Gói khám" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <InputSelect
                  value={clinic}
                  onChange={setClinic}
                  data={listClinicSelect}
                  name="Chọn phòng khám"
                  isError={errors.clinic ? true : false}
                  errorText={errors.clinic ? errors.clinic : ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  value={type}
                  onChange={setType}
                  data={dataSelect.filter((e) => e.type === "PACKET")}
                  name="Chọn loại gói"
                  isError={errors.type ? true : false}
                  errorText={errors.type ? errors.type : ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  value={specialty}
                  onChange={setSpecialty}
                  data={dataSelect.filter((e) => e.type === "SPECIALTY")}
                  name="Chọn chuyên khoa"
                  isError={errors.specialty ? true : false}
                  errorText={errors.specialty ? errors.specialty : ""}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  label="Chọn giá (VNĐ)"
                  value={price}
                  onChange={setPrice}
                  data={dataSelect.filter((e) => e.type === "PRICE")}
                  isError={errors.price ? true : false}
                  errorText={errors.price ? errors.price : ""}
                  name="Chọn giá (VNĐ)"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <InputSelect
                  label="Chọn phương thức thanh toán"
                  value={payment}
                  onChange={setPayment}
                  data={dataSelect.filter((e) => e.type === "PAYMENT")}
                  isError={errors.payment ? true : false}
                  errorText={errors.payment ? errors.payment : ""}
                  name="Chọn phương thức thanh toán"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Tên"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name ? true : false}
                  helperText={errors.name}
                  value={name}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Giới thiệu"
                  multiline
                  required
                  maxRows={5}
                  fullWidth
                  onChange={(e) => setIntroduce(e.target.value)}
                  error={errors.introduce ? true : false}
                  helperText={errors.introduce}
                  value={introduce}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <UpLoadAvatar
              setImg={setImage}
              content="Tải ảnh"
              borderRadius="5px"
              preHeight={smScreen ? "150px" : "200px"}
              preWidth={smScreen ? "250px" : "400px"}
              previewImgUrl={previewImgUrl}
              setPreviewImgUrl={setPreviewImgUrl}
              isError={errors.image ? true : false}
              errorText={errors.image}
            />
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
    allcodes: state.admin.allcodes,
    listClinic: state.client.listClinic,
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPacket: (data) => dispatch(actions.createPacketAction(data)),
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    getListClinic: () => dispatch(actions.getListClinicHomePatientAction()),
    getSpecialtyByClinicId: (id) =>
      dispatch(actions.getSpecialtyByClinicIdAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPacket);
