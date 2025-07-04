import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Stack, Button, Card } from "@mui/material";
import HomeHeader from "../../HomePage/Section/Header";
import HomeFooter from "../../HomePage/Section/Footer";
import Rating from "@mui/material/Rating";
import CardMedia from "@mui/material/CardMedia";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import confirmImg from "../../../assets/verified.png";
import { useSearchParams } from "react-router-dom";
import {
  patientUpdateFeedback,
  patientCheckAllowUpdateFeedback,
} from "../../../services/scheduleService";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import localization from "moment/locale/vi";
import moment from "moment";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState(3);
  const [allow, setAllow] = useState(false);
  const [information, setInformation] = useState("");
  const [searchParams] = useSearchParams();
  let data = {
    doctorId: searchParams.get("doctorId"),
    packetId: searchParams.get("packetId"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
    // rating: value,
    // comment: message,
  };

  useEffect(() => {
    const checkAllowUpdate = async () => {
      const res = await patientCheckAllowUpdateFeedback(data);
      if (res && res.success === false) {
        setAllow(false);
      } else if (res && res.success === true) {
        setAllow(true);
        setInformation(res.information);
      } else if (!res) {
        toast.error("Đã có lỗi xảy ra");
      }
    };

    checkAllowUpdate();
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClickSent = async () => {
    if (!value) {
      toast.warning("Vui lòng chọn mức độ hài lòng");
      return;
    }
    if (!message) {
      toast.warning("Vui lòng để lại lời nhắn");
      return;
    }
    const dataSent = { ...data, rating: value, comment: message };
    const res = await patientUpdateFeedback(dataSent);
    if (res && res.success) {
      setAllow(false);
      return;
    }
    toast.error("Đã có lỗi xảy ra");
  };

  return (
    <>
      <HomeHeader />
      <Box>
        {allow === false ? (
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 1, md: 1, xl: 5 },
              p: 3,
              width: "100%",
              minHeight: "700px",
            }}
          >
            <Typography
              color="#00cc00"
              sx={{ fontWeight: "bold", fontSize: { sm: 26, md: 30 } }}
            >
              ĐÃ ĐÁNH GIÁ
            </Typography>
            <CardMedia
              component="img"
              sx={{
                borderRadius: "50%",
                width: { xs: "50px", md: 100 },
                height: { xs: "50px", md: 100 },
              }}
              image={confirmImg}
              alt={"confirm image"}
            />
          </Stack>
        ) : (
          <Container>
            <Stack>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  margin: "85px 0",
                }}
              >
                Phản hồi người dùng
              </Typography>
              {/* <Typography variant="subtitle1">
              Chúng tôi rất vui lòng tiếp nhận phản hồi của bạn, xin hãy để lại
              đánh giá.
            </Typography> */}
            </Stack>
            <Stack spacing={2}>
              <Stack>
                <Card sx={{ display: "flex" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5" mb={2}>
                      Thông tin khám bệnh
                    </Typography>
                    <Typography variant="subtitle1">
                      Thời gian khám:{} &nbsp;
                      {moment.unix(information.date).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="subtitle1">
                      Bác sĩ: {information?.doctor?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Gói khám: {information?.packet?.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Phòng khám:
                      {information?.doctor?.id
                        ? information?.doctor?.id?.detail?.clinic?.name
                        : "tên cua packet"}
                    </Typography>
                    <Typography variant="subtitle1">
                      Chuyên khoa:{" "}
                      {information?.doctor?.id
                        ? information?.doctor?.id?.detail?.specialty?.name
                        : "tên cua packet"}
                    </Typography>
                  </CardContent>
                  {information?.doctor?.id ? (
                    <CardMedia
                      component="img"
                      sx={{
                        width: 160,
                        display: { xs: "none", sm: "block" },
                        borderRadius: "4px",
                      }}
                      image={
                        information?.doctor?.id
                          ? information?.doctor?.id?.image?.url
                          : ""
                      }
                      alt={"imange"}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      sx={{
                        width: 360,
                        display: { xs: "none", sm: "block" },
                        borderRadius: "4px",
                      }}
                      image={
                        information?.packet?.id
                          ? information?.packet?.id?.image?.url
                          : ""
                      }
                      alt={"imange"}
                    />
                  )}
                </Card>
              </Stack>
              <Stack
                spacing={1}
                display={"flex"}
                alignItems={"center"}
                direction={"row"}
              >
                <Typography variant="subtitle1" sx={{ marginTop: "5px" }}>
                  Mức độ hài lòng
                </Typography>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Stack>
              <textarea
                rows="4"
                cols="50"
                //   maxLength={100}
                value={message}
                onChange={handleMessageChange}
                style={{
                  resize: "none",
                  borderRadius: "4px",
                  outline: "none",
                  padding: "10px",
                }}
              />

              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  width: "fit-content",
                  marginLeft: "auto !important",
                  marginBottom: "20px !important",
                }}
                onClick={handleClickSent}
              >
                Gửi
              </Button>
            </Stack>
          </Container>
        )}
      </Box>
      <HomeFooter />
    </>
  );
};

export default Feedback;
