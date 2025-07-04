import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import validator from "validator";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
} from "@mui/material";
import "dayjs/locale/vi";
import dayjs from "dayjs";
import AccountProfile from "./Section/AccountProfile";
import {
  AccountProfileDetails,
  AccountProfileClinic,
} from "./Section/account-profile-details";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";
import { useRef } from "react";
import { scopes } from "../../../utils";
import PermissionsGate from "../../../hoc/PermissionsGate";
const CONST_GENDER = [
  { value: "M", label: "Nam" },
  { value: "F", label: "Nữ" },
];
const DetailUser = ({
  fetchAllcode,
  user,
  allcodes,
  getListClinic,
  listClinic,
  open,
  setOpen,
  updateUser,
  listSpecialtyInClinic,
  getSpecialtyByClinicIdAction,
  enableEdit,
  setEnableEdit,
}) => {
  //infomation doctor
  const [roleId, setRoleId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    detail: "",
    province: "",
  });
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  //information doctor's clinic
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [listClinicSelect, setListClinicSelect] = useState([]);
  const [errors, setErrors] = useState({});
  const [imgUpdate, setImgUpdate] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  // check edit
  const [listSpecialty, setListSpecialty] = useState([]);
  // dùng useRef lưu lại chuyên khoa ban đầu
  const idSpecialty = useRef();

  useEffect(() => {
    if (_.isEmpty(user) === false) {
      setRoleId(user.roleId ? user.roleId : "");
      setEmail(user.email);
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
      CONST_GENDER.map((e) => {
        if (e.value === user.gender) setGender(e);
      });
      setPreviewImgUrl("");
      setImage(user?.image ? user.image : "");
      setDate(user.dateOfBirth);
      setClinic({
        value: user.detail.clinic.id ? user.detail.clinic.id : "",
        label: user.detail.clinic.name ? user.detail.clinic.name : "",
      });
      setPosition({
        value: user.detail.position.id ? user.detail.position.id : "",
        label: user.detail.position.name ? user.detail.position.name : "",
      });
      setSpecialty({
        value: user.detail.specialty.id ? user.detail.specialty.id : "",
        label: user.detail.specialty.name ? user.detail.specialty.name : "",
      });
      idSpecialty.current = user.detail.specialty.id;
      setPrice({
        value: user.detail.price.id ? user.detail.price.id : "",
        label: user.detail.price.name ? user.detail.price.name : "",
      });
      setPayment({
        value: user.detail.payment.id ? user.detail.payment.id : "",
        label: user.detail.payment.name ? user.detail.payment.name : "",
      });
      setIntroduce(user.detail.introduce);
      setNote(user.detail.note);
      setContent(user.detail.detail);
    }
  }, [user]);
  useEffect(() => {
    if (enableEdit === true) {
      fetchAllcode();
      getListClinic();
    }
  }, [enableEdit]);

  useEffect(() => {
    if (enableEdit === true) getSpecialtyByClinicIdAction(clinic.value);
  }, [enableEdit, clinic]);

  useEffect(() => {
    setListSpecialty(
      listSpecialtyInClinic.map((e) => {
        return {
          id: e.key,
          name: e.name,
        };
      })
    );
  }, [listSpecialtyInClinic]);

  useEffect(() => {
    if (listClinic && listClinic.length > 0)
      setListClinicSelect(
        listClinic.map((e) => {
          return {
            id: e._id,
            name: e.name,
          };
        })
      );

    if (allcodes && allcodes.length > 0)
      setDataSelect(
        allcodes.map((e) => ({ id: e._id, name: e.valueVI, type: e.type }))
      );
  }, [allcodes, listClinic]);

  const handleClose = () => {
    setPreviewImgUrl("");
    setOpen(false);
    setEmail("");
    setName("");
    setPhone("");
    setAddress({
      detail: "",
      province: "",
    });
    setGender("");
    setPosition("");
    setImage("");
    setDate("");
    setRoleId("");
    setClinic("");
    setSpecialty("");
    setPrice("");
    setPayment("");
    setIntroduce("");
    setNote("");
    setContent("");
    setImgUpdate("");
    setEnableEdit(false);
    setErrors({});
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
  const checkValidate = () => {
    let errors = {};
    if (!email) errors.email = "Email không được bỏ trống";
    if (!validator.isEmail(email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!name) errors.name = "Tên không được bỏ trống";
    if (!address.detail) errors.address = "Địa chỉ không được bỏ trống";
    if (!phone) errors.phone = "Số điện thoại không được bỏ trống";
    if (!validator.isMobilePhone(phone))
      errors.phone = "Số điện thoại không hợp lệ";
    if (!content) errors.content = "Chi tiết không được bỏ trống";
    if (!introduce) errors.introduce = "Mô tả không được bỏ trống";
    // if (!note) errors.note = "Ghi chú không được bỏ trống";
    if (!position) errors.position = "Chưa chọn vị trí";
    if (!payment) errors.payment = "Chưa chọn phương thức thanh toán";
    if (!price) errors.price = "Chưa chọn giá";
    if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    if (!specialty) errors.specialty = "Chưa chọn khoa";
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
      roleId,
      image: imgUpdate ? imgUpdate : null,
      email,
      name,
      phone,
      gender: gender?.value ? gender.value : null,
      address,
      dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
      detail: {
        position: {
          id: position.value ? position.value : null,
          name: position.label ? position.label : null,
        },
        clinic: {
          id: clinic.value ? clinic.value : null,
          name: clinic.label ? clinic.label : null,
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
        note,
        detail: content,
      },
    };
    updateUser(user.id, data);
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
              title="Chi tiết bác sĩ"
              isShowSwitch={roleId !== "R0" ? true : false}
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
                    <AccountProfile
                      name={name}
                      email={email}
                      position={position}
                      address={address}
                      image={image}
                      phone={phone}
                      clinic={clinic}
                      introduce={introduce}
                      specialty={specialty}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      enableEdit={enableEdit}
                      roleId={roleId}
                      setRoleId={setRoleId}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <AccountProfileDetails
                          email={email}
                          setEmail={setEmail}
                          name={name}
                          setName={setName}
                          phone={phone}
                          setPhone={setPhone}
                          address={address}
                          setAddress={setAddress}
                          gender={gender}
                          setGender={setGender}
                          position={position}
                          setPosition={setPosition}
                          date={date}
                          setDate={setDate}
                          errors={errors}
                          dataSelect={dataSelect}
                        />
                      </Grid>
                      <Grid xs={12} md={12} lg={12}>
                        <AccountProfileClinic
                          clinic={clinic}
                          setClinic={setClinic}
                          specialty={specialty}
                          setSpecialty={setSpecialty}
                          price={price}
                          setPrice={setPrice}
                          payment={payment}
                          setPayment={setPayment}
                          introduce={introduce}
                          setIntroduce={setIntroduce}
                          note={note}
                          setNote={setNote}
                          content={content}
                          setContent={setContent}
                          dataSelect={dataSelect}
                          listClinicSelect={listClinicSelect}
                          listSpecialty={listSpecialty}
                          idSpecialtyConstant={idSpecialty.current}
                          errors={errors}
                          setErrors={setErrors}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                {enableEdit && (
                  <Grid display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                    <PermissionsGate scopes={[scopes.USER_UPDATE]}>
                      <ButtonComponent
                        content="Lưu"
                        handleClick={handleSave}
                        bgcolor="#94e2cd"
                        color="#141414"
                        hoverBgColor="#1e5245"
                        hoverColor="#fff"
                      />
                    </PermissionsGate>
                  </Grid>
                )}
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
    listClinic: state.client.listClinic,
    allcodes: state.admin.allcodes,
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
    getListClinic: () => dispatch(actions.getListClinicHomePatientAction()),
    getSpecialtyByClinicIdAction: (id) =>
      dispatch(actions.getSpecialtyByClinicIdAction(id)),
    updateUser: (id, data) => dispatch(actions.updateUserAction(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailUser);
