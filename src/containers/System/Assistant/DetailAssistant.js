import React, { useEffect, useState, useRef } from "react";
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
import { AssistantProfile } from "./section/AssistantProfile";
import ButtonComponent from "../../../components/ButtonComponent";
import _ from "lodash";
import { scopes } from "../../../utils";
import { getSingleAssistant } from "../../../services/assistantService.js";
import PermissionsGate from "../../../hoc/PermissionsGate";
import { toast } from "react-toastify";
import AssistantIntroduce from "./section/AssistantIntroduce";
import { getAllDoctorBySpecialtyOfClinicHome } from "../../../services/userService";
import { updateAssistant } from "../../../services/assistantService";

const DetailAssistant = ({
  id,
  getListClinic,
  listClinic,
  listSpecialtyInClinic,
  getSpecialtyByClinicIdAction,
  open,
  setOpen,
  enableEdit,
  setEnableEdit,
  loadingToggleAction,
}) => {
  //infomation doctor
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    detail: "",
    province: "",
  });
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [errors, setErrors] = useState({});
  const [doctor, setDoctor] = useState("");
  const [imgUpdate, setImgUpdate] = useState(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [listClinicSelect, setListClinicSelect] = useState([]);
  const [listSpecialty, setListSpecialty] = useState([]);
  const [listDoctorSelect, setListDoctorSelect] = useState([]);
  const defaultClinic = useRef("");

  const getDetailAssistant = async (id) => {
    try {
      const CONST_GENDER = [
        { value: "M", label: "Nam" },
        { value: "F", label: "Nữ" },
      ];
      const res = await getSingleAssistant(id);
      if (res && res.success) {
        const assistant = res.assistant;
        setEmail(assistant.email);
        setName(assistant.name);
        setPhone(assistant.phone);
        setAddress(assistant.address);
        CONST_GENDER.map((e) => {
          if (e.value === assistant.gender) setGender(e);
        });
        setImage(assistant.image.url);
        setDate(assistant.dateOfBirth);
        setClinic({
          value: assistant.doctor.id.detail.clinic.id,
          label: assistant.doctor.id.detail.clinic.name,
        });
        defaultClinic.current = assistant.doctor.id.detail.clinic.id;
        setSpecialty({
          value: assistant.doctor.id.detail.specialty.id,
          label: assistant.doctor.id.detail.specialty.name,
        });
        setDoctor({
          value: assistant.doctor.id._id,
          label: assistant.doctor.id.name,
        });
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!id || !open) return;
    getDetailAssistant(id);
  }, [open, id]);

  useEffect(() => {
    if (enableEdit === true) {
      getListClinic();
    }
  }, [enableEdit]);

  useEffect(() => {
    if (!clinic.value) return;
    getSpecialtyByClinicIdAction(clinic.value);
    if (specialty && doctor) {
      setDoctor("");
    }
    if (defaultClinic.current !== clinic.value) {
      setSpecialty("");
    }
  }, [clinic]);

  const fetchListDoctor = async (id) => {
    const data = {
      page: 1,
      size: 999,
      specialtyId: id,
      clinicId: clinic ? clinic?.value : "",
    };
    const res = await getAllDoctorBySpecialtyOfClinicHome(data);
    if (res && res.success) {
      setListDoctorSelect(
        res?.users.map((i) => {
          return {
            id: i._id || i.id,
            name: i.name,
          };
        })
      );
    }
  };
  useEffect(() => {
    if (!specialty.value || !clinic.value) return;
    setDoctor("");
    setListClinicSelect("");
    fetchListDoctor(specialty.value);
  }, [specialty]);

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
  }, [listClinic]);

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
    setImage("");
    setDate("");
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
    if (!clinic) errors.clinic = "Chưa chọn cơ sở";
    if (!specialty) errors.specialty = "Chưa chọn chuyên khoa";
    if (!doctor) errors.doctor = "Chưa chọn bác sĩ";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  const handleSave = async () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    let data = {
      image: imgUpdate ? imgUpdate : null,
      email,
      name,
      phone,
      gender: gender?.value ? gender.value : null,
      address,
      dateOfBirth: dayjs(date).format("YYYY-MM-DD"),
      doctor: {
        id: doctor.value,
        name: doctor.label,
      },
    };
    try {
      loadingToggleAction(true);
      const res = await updateAssistant(id, data);
      if (res && res.success) {
        setEmail("");
        setName("");
        setPhone("");
        setAddress("");
        setImage("");
        setDate("");
        setClinic({
          value: "",
          label: "",
        });
        setSpecialty({
          value: "",
          label: "",
        });
        setDoctor({
          value: "",
          label: "",
        });
        setEnableEdit(false);
        setOpen(false);
        loadingToggleAction(false);
        toast.success("Cập nhập thành công");
      } else {
        loadingToggleAction(false);
        toast.error("Cập nhập thất bại");
      }
    } catch {
      loadingToggleAction(false);
      toast.error("Đã xảy ra lỗi");
    }
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
              title="Chi tiết trợ lý"
              titleSwich={"Chỉnh sửa"}
              isChecked={enableEdit}
              setChecked={setEnableEdit}
              isShowSwitch={true}
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
                    <AssistantIntroduce
                      name={name}
                      email={email}
                      address={address}
                      image={image}
                      phone={phone}
                      clinic={clinic}
                      specialty={specialty}
                      setImgUpdate={setImgUpdate}
                      previewImgUrl={previewImgUrl}
                      setPreviewImgUrl={setPreviewImgUrl}
                      enableEdit={enableEdit}
                      gender={gender}
                      doctor={doctor}
                    />
                  </Grid>
                  {enableEdit && (
                    <>
                      <Grid xs={12} md={6} lg={8}>
                        <AssistantProfile
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
                          date={date}
                          setDate={setDate}
                          errors={errors}
                          clinic={clinic}
                          setClinic={setClinic}
                          specialty={specialty}
                          setSpecialty={setSpecialty}
                          listClinicSelect={listClinicSelect}
                          listSpecialty={listSpecialty}
                          doctor={doctor}
                          setDoctor={setDoctor}
                          listDoctorSelect={listDoctorSelect}
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
    listSpecialtyInClinic: state.admin.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinic: () => dispatch(actions.getListClinicHomePatientAction()),
    getSpecialtyByClinicIdAction: (id) =>
      dispatch(actions.getSpecialtyByClinicIdAction(id)),
    updateUser: (id, data) => dispatch(actions.updateUserAction(id, data)),
    loadingToggleAction: (id) => dispatch(actions.loadingToggleAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailAssistant);
