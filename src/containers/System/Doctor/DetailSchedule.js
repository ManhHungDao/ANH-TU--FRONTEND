import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Unstable_Grid2 as Grid,
  Modal,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import _ from "lodash";
import {
  PatientProfile,
  ScheduleProfile,
  ResponseDetail,
  PacketProfile,
  DoctorProfile,
} from "./section/DetailProfile";
import dayjs from "dayjs";
import { emailCancel } from "../../../data/emailCancel";
import { emailDesciption } from "../../../data/emailDescription";

const mailDrescription = `<figure class="table" style="width:98.65%;"><table class="ck-table-resized"><colgroup><col style="width:38.11%;"><col style="width:12.08%;"><col style="width:49.81%;"></colgroup><tbody><tr><td>Tên thuốc</td><td>Số lượng</td><td>Liều dùng</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
</tbody></table></figure>`;

const DetailSchedule = ({
  open,
  setOpen,
  data,
  dataTime,
  sentMail,
  date,
  updateStatusSchedule,
  createPrescription,
  getSinglePrescription,
  prescription,
  isSuccess,
  clearStatus,
  userInfo,
}) => {
  const [status, setStatus] = useState();
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");
  const [result, setResult] = useState("");
  const [detailPrescription, setDetailPrescription] =
    useState(mailDrescription);

  useEffect(() => {
    if (isSuccess !== null) {
      if (isSuccess === true) {
        setTitle("");
        setDetailPrescription("");
        setResult("");
        setStatus("");
        setOpen(false);
      }
      clearStatus();
    }
  }, [isSuccess]);

  useEffect(() => {
    // setTitle("");
    // setDetailPrescription("");
    // setResult("");
    setStatus(data.status);
    setPatient(data.user);
    let time = dataTime.find((e) => e._id === data.time);
    setTime(time?.valueVI);
  }, [data]);

  useEffect(() => {
    if (!prescription) return;
    setDetailPrescription(
      prescription?.detail ? prescription.detail : mailDrescription
    );
    setResult(prescription?.result ? prescription.result : "");
  }, [prescription]);

  // useEffect(() => {
  //   if (!title) return;
  //   if (title[0] === "Đơn thuốc" && !detailPrescription)
  //     setDetailPrescription(mailDrescription);
  // }, [title]);

  useEffect(() => {
    if (status !== "Hoàn thành") return;
    getSinglePrescription(data._id);
  }, [status]);

  const handleClose = () => {
    setOpen(false);
    setErrors("");
    setTitle("");
    setDetailPrescription(mailDrescription);
    setStatus("");
  };
  const style = {
    position: "absolute",
    width: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "fit-content",
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
    if (!title) errors.title = "Chưa chọn tiêu đề thư";
    if (!detailPrescription || !result)
      errors.content = "Chưa có kết quả hoặc chi tiết đơn thuốc";
    return errors;
  };
  const isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  const dataSentEmail = () => {
    return {
      time: time ? time : "",
      date: date ? dayjs(new Date(date)).format("DD/MM/YYYY") : "",
      doctorName: data?.doctor?.name ? data?.doctor?.name : "",
      packetName: data?.packet?.name ? data?.packet?.name : "",
      clinic: data.doctor.clinic.name
        ? data.doctor.clinic.name
        : data?.packet?.clinic?.name
        ? data?.packet?.clinic?.name
        : "",
      specialty: data.doctor.specialty.name
        ? data.doctor.specialty.name
        : data?.packet?.specialty
        ? data?.packet?.specialty
        : "",
      linkFeedBack: `http://localhost:3000/feedback?date=${
        data ? dayjs(date).unix() : ""
      }&time=${data?.time ? data.time : ""}&doctorId=${
        data?.doctor?.id ? data.doctor.id : ""
      }&packetId=${data?.packet?.id ? data.packet.id : ""}`,
    };
  };

  const handleUploadStatus = () => {
    let dataSend = {
      status: _.isArray(status) ? status[0] : status,
      date: dayjs(date).unix(),
      time: data.time,
      doctorId: data?.doctor?.id ? data.doctor.id : null,
      packetId: data?.packet?.id ? data.packet.id : null,
    };
    updateStatusSchedule(dataSend);

    if (status[0] === "Đã hủy" && !_.isElement(patient)) {
      const dataEmail = dataSentEmail();
      const emailCancelHtml = emailCancel(patient.name, dataEmail);
      const dataSendMail = {
        to: patient.email,
        subject: "Thông báo hủy lịch khám",
        html: emailCancelHtml,
      };
      sentMail(dataSendMail);
    }
  };
  const handleSendMail = () => {
    const errors = checkValidate();
    const checkValidInPut = isValid(errors);
    if (!checkValidInPut) {
      setErrors(errors);
      return;
    }
    const dataEmail = dataSentEmail();
    const emailDescriptionHTML = emailDesciption(
      patient.name,
      dataEmail,
      detailPrescription,
      result
    );
    const dataSentMail = {
      to: patient?.email ? patient.email : "",
      subject: title[0],
      html: emailDescriptionHTML,
    };
    sentMail(dataSentMail);
    createPrescription({
      scheduleId: data._id,
      doctor: data?.doctor?.name ? data?.doctor?.name : "",
      packet: data?.packet?.name ? data?.packet?.name : "",
      clinic: data.doctor.clinic.name
        ? data.doctor.clinic.name
        : data?.packet?.clinic?.name
        ? data?.packet?.clinic?.name
        : "",
      specialty: data.doctor.specialty.name
        ? data.doctor.specialty.name
        : data?.packet?.specialty
        ? data?.packet?.specialty
        : "",
      detail: detailPrescription,
      result,
    });
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
            <Header title="Chi tiết lịch khám" />
          </Box>

          <Container maxWidth="lg">
            <Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <PatientProfile
                    patient={patient}
                    status={status}
                    time={time}
                    dataTime={dataTime}
                    setStatus={setStatus}
                  />
                </Grid>
                {data?.packet ? (
                  <Grid item xs={12} md={4}>
                    <PacketProfile
                      packet={data?.packet}
                      status={status}
                      time={time}
                      dataTime={dataTime}
                      setStatus={setStatus}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={4}>
                    <DoctorProfile
                      status={status}
                      time={time}
                      dataTime={dataTime}
                      setStatus={setStatus}
                      doctor={data?.doctor}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={4}>
                  <Grid container>
                    <Grid xs={12} md={12} lg={12} p={0}>
                      <ScheduleProfile
                        status={status}
                        time={time}
                        dataTime={dataTime}
                        setStatus={setStatus}
                        handleSave={handleUploadStatus}
                        isDisable={
                          dayjs(date).unix() <
                          dayjs(new Date().setHours(0, 0, 0)).unix()
                        }
                        isFuture={
                          dayjs(date).unix() >
                          dayjs(new Date().setHours(0, 0, 0)).unix()
                        }
                        hasUser={patient?.email === "" ? false : true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                {status === "Hoàn thành" && !_.isEmpty(prescription) && (
                  <>
                    <Grid item xs={12} md={12} xl={6}>
                      <Card>
                        <CardHeader title="Kế quả khám" />
                        <CardContent className="render__prescrtiption">
                          <span
                            className="render__prescrtiption--detail"
                            dangerouslySetInnerHTML={{
                              __html: prescription.result,
                            }}
                          ></span>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={12} xl={6}>
                      <Card>
                        <CardHeader title="Thông tin đơn thuốc" />
                        <CardContent className="render__prescrtiption">
                          <span
                            className="render__prescrtiption--detail"
                            dangerouslySetInnerHTML={{
                              __html: prescription.detail,
                            }}
                          ></span>
                        </CardContent>
                      </Card>
                    </Grid>
                  </>
                )}
                {status === "Hoàn thành" && (
                  <Grid item xs={12} md={12}>
                    <ResponseDetail
                      status={status}
                      setStatus={setStatus}
                      content={
                        !title
                          ? ""
                          : title[0] === "Đơn thuốc"
                          ? detailPrescription
                          : result
                      }
                      setContent={
                        title[0] === "Đơn thuốc"
                          ? setDetailPrescription
                          : setResult
                      }
                      handleSave={handleSendMail}
                      title={title}
                      setTitle={setTitle}
                      errors={errors}
                      checkRole={userInfo.roleId === "R4" ? true : false}
                    />
                  </Grid>
                )}
              </Grid>
            </Stack>
          </Container>
        </Box>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    isSuccess: state.app.isSuccess,
    prescription: state.admin.prescription,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sentMail: (data) => dispatch(actions.sentMailAction(data)),
    createPrescription: (data) =>
      dispatch(actions.createPrescriptionAction(data)),
    updateStatusSchedule: (data) =>
      dispatch(actions.updateStatusScheduleAction(data)),
    clearStatus: () => dispatch(actions.clearStatus()),
    getSinglePrescription: (id) =>
      dispatch(actions.getSinglePrescriptionAdminAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSchedule);
