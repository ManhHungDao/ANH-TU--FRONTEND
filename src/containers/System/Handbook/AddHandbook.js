import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Grid, TextField } from "@mui/material";
import Header from "../../../components/Header.jsx";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import InputSelect from "../../../components/Input/InputSelect";
import ButtonComponent from "../../../components/ButtonComponent";

const AddHandbook = ({
  getListClinicAction,
  isSuccess,
  listClinic,
  listSpecialty,
  fetchAllcodeByTypeAction,
  createHandbookAction,
  clearStatus,
  getSpecialtyByClinicIdAction,
  listSpecialtyInClinic,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [selectSpecialty, setSelectSpecialty] = useState("");
  const [selectClinic, setSelectClinic] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [dataClinic, setDataClinic] = useState([]);
  const [dataSpecialty, setDataSpecialty] = useState([]);

  useEffect(() => {
    getListClinicAction();
    fetchAllcodeByTypeAction({ page: 1, size: 999, filter: "SPECIALTY" });
    // getListSpecialtyACtion();
  }, []);

  useEffect(() => {
    if (isSuccess === true) {
      clearStatus();
      // set lại data ban đầu, lấy danh sách chuyên khoa phổ biến
      if (listSpecialty && listSpecialty.count > 0)
        setDataSpecialty(
          listSpecialty.list.map((e) => ({
            id: e._id,
            name: e.valueVI,
          }))
        );
      setSelectSpecialty("");
      setSelectClinic("");
      setName("");
      setImage("");
      setNote("");
      setDetail("");
      setPreviewImgUrl("");
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (listClinic && listClinic.length > 0)
      setDataClinic(
        listClinic.map((e) => ({
          id: e._id,
          name: e.name,
        }))
      );

    if (listSpecialty && listSpecialty.count > 0)
      setDataSpecialty(
        listSpecialty.list.map((e) => ({
          id: e._id,
          name: e.valueVI,
        }))
      );
  }, [listSpecialty, listClinic]);

  useEffect(() => {
    if (selectClinic) {
      getSpecialtyByClinicIdAction(selectClinic.value);
      setSelectSpecialty("");
    }
  }, [selectClinic]);

  useEffect(() => {
    setDataSpecialty(
      listSpecialtyInClinic.map((e) => {
        return {
          id: e.key,
          name: e.name,
        };
      })
    );
  }, [listSpecialtyInClinic]);

  const checkValidate = () => {
    let errors = {};
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!selectSpecialty) errors.selectSpecialty = "Chưa chọn chuyên khoa";
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
      image,
      detail,
      note,
      clinic: {
        id: selectClinic.value,
        name: selectClinic.label,
      },
      specialty: {
        id: selectSpecialty.value,
        name: selectSpecialty.label,
      },
    };
    createHandbookAction(data);
  };
  return (
    <>
      <Box m="20px">
        <Header title="Thêm Mới Cẩm Nang" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <InputSelect
                  value={selectClinic}
                  onChange={setSelectClinic}
                  data={dataClinic}
                  name="Chọn cơ sở"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <InputSelect
                  value={selectSpecialty}
                  onChange={setSelectSpecialty}
                  data={dataSpecialty}
                  isError={errors.selectSpecialty ? true : false}
                  errorText={
                    errors.selectSpecialty ? errors.selectSpecialty : ""
                  }
                  name="Chọn chuyên khoa"
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
              <Grid
                item
                xs={12}
                md={12}
                display="flex"
                justifyContent={"center"}
              ></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <span className="detail__handbook--introduce">
              <CKEditorFieldBasic
                value={note}
                onChange={setNote}
                title="Ghi chú"
                isError={errors.note ? true : false}
                errorText={errors.note}
              />
            </span>
          </Grid>
          <Grid item xs={12} md={12}>
            <span className="">
              <CKEditorFieldBasic
                value={detail}
                onChange={setDetail}
                title="Chi tiết"
                isError={errors.detail ? true : false}
                errorText={errors.detail}
              />
            </span>
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
    listClinic: state.client.listClinic,
    listSpecialty: state.admin.allcodeType,
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createHandbookAction: (data) =>
      dispatch(actions.createHandbookAction(data)),
    getListClinicAction: () =>
      dispatch(actions.getListClinicHomePatientAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    getListSpecialtyACtion: () =>
      dispatch(actions.getListSpecialtyHomePatientAction("")),
    getSpecialtyByClinicIdAction: (id) =>
      dispatch(actions.getSpecialtyByClinicIdAction(id)),
    fetchAllcodeByTypeAction: (data) =>
      dispatch(actions.fetchAllcodeByTypeAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddHandbook);
