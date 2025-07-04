import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import Header from "../../../components/Header.jsx";
import Grid from "@mui/material/Grid";
import UpLoadAvatar from "../../../components/UpLoadAvatar";
import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";
import useIsTablet from "../../../components/useScreen/useIsTablet";
import InputSelect from "../../../components/Input/InputSelect";

const AddSpecialty = ({
  listClinic,
  getListClinicAction,
  isSuccess,
  clearStatus,
  createSpecialtyAction,
  allcodeType,
  fetchAllcodeByTypeAction,
}) => {
  const [content, setContent] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [image, setImage] = useState("");
  const [dataClinic, setDataClinic] = useState([]);
  const [dataSpecialty, setDataSpecialty] = useState([]);
  const [isPopular, setIsPopular] = useState(false);
  const [selectClinic, setSelectClinic] = useState("");
  const [selectSpecialty, setSelectSpecialty] = useState("");
  const [errors, setErrors] = useState("");
  const smScreen = useIsTablet();

  useEffect(() => {
    if (isPopular === true) setSelectClinic("");
  }, [isPopular]);

  useEffect(() => {
    getListClinicAction();
    const data = {
      page: 1,
      filter: "SPECIALTY",
      size: 999,
    };
    fetchAllcodeByTypeAction(data);
  }, []);

  useEffect(() => {
    if (listClinic && listClinic.length > 0)
      setDataClinic(listClinic.map((e) => ({ id: e._id, name: e.name })));
    if (allcodeType.list && allcodeType.list.length > 0)
      setDataSpecialty(
        allcodeType.list.map((e) => ({ id: e._id, name: e.valueVI }))
      );
  }, [listClinic, allcodeType]);

  useEffect(() => {
    if (isSuccess === true) {
      setContent("");
      setImage("");
      setPreviewImgUrl("");
      setSelectClinic("");
      setSelectSpecialty("");
      setErrors("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    clearStatus();
  }, [isSuccess]);
  const checkValidate = () => {
    let errors = {};
    if (!image) errors.image = "Chưa tải hình ảnh";
    if (!selectSpecialty) errors.selectSpecialty = "Chưa chọn chuyên khoa";
    if (isPopular === false)
      if (!selectClinic) errors.selectClinic = "Chưa chọn cơ sở";

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
      name: selectSpecialty.label ? selectSpecialty.label : "",
      key: selectSpecialty.value ? selectSpecialty.value : "",
      clinic: {
        id: selectClinic.value ? selectClinic.value : null,
        name: selectClinic.label ? selectClinic.label : null,
      },
      popular: isPopular,
    };
    createSpecialtyAction(data);
  };
  return (
    <>
      <Box m="20px">
        <Header
          title="Thêm Mới Chuyên Khoa"
          isShowSwitch={true}
          titleSwich={"Phổ biến"}
          isChecked={isPopular}
          setChecked={setIsPopular}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {!isPopular && (
                <Grid item xs={12} md={12}>
                  <InputSelect
                    value={selectClinic}
                    onChange={setSelectClinic}
                    data={dataClinic}
                    name="Chọn phòng khám"
                    isError={errors.selectClinic ? true : false}
                    errorText={errors.selectClinic ? errors.selectClinic : ""}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                <InputSelect
                  value={selectSpecialty}
                  onChange={setSelectSpecialty}
                  data={dataSpecialty}
                  name="Chọn chuyên khoa"
                  isError={errors.selectSpecialty ? true : false}
                  errorText={
                    errors.selectSpecialty ? errors.selectSpecialty : ""
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
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
    listClinic: state.client.listClinic,
    isSuccess: state.app.isSuccess,
    allcodeType: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSpecialtyAction: (data) =>
      dispatch(actions.createSpecialtyAction(data)),
    getListClinicAction: () =>
      dispatch(actions.getListClinicHomePatientAction()),
    clearStatus: () => dispatch(actions.clearStatus()),
    fetchAllcodeByTypeAction: (data) =>
      dispatch(actions.fetchAllcodeByTypeAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialty);
