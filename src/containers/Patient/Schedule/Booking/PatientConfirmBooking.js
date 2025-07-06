import React, { useState, useEffect } from "react";
import Header from "../../../HomePage/Section/Header";
import Skeleton from "@mui/material/Skeleton";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import confirmImg from "../../../../assets/verified.png";
import failedImg from "../../../../assets/failed.png";
import { patientConfirmBooking } from "../../../../services/scheduleService";
import { useSearchParams } from "react-router-dom";

const PatientConfirmBooking = () => {
  const [isSucceed, setIsSucceed] = useState("");
  const [searchParams] = useSearchParams();
  const cancel = searchParams.get("cancel");
  const data = {
    cancel,
    doctorId: searchParams.get("doctorId"),
    email: searchParams.get("email"),
    packetId: searchParams.get("packetId"),
    date: searchParams.get("date"),
    time: searchParams.get("time"),
  };
  const conFirmFunc = async () => {
    const res = await patientConfirmBooking(data);
    if (res && res.success) setIsSucceed(true);
    else setIsSucceed(false);
  };

  useEffect(() => {
    conFirmFunc();
  }, []);
  const success = () => {
    return (
      <>
        <Typography
          color="#00cc00"
          sx={{ fontWeight: "bold", fontSize: { sm: 26, md: 30 } }}
        >
          {cancel ? "HỦY THÀNH CÔNG" : "ĐÃ XÁC NHẬN"}
        </Typography>
        <CardMedia
          component="img"
          sx={{
            borderRadius: "50%",
            width: { sm: 60, md: 100 },
            height: { sm: 60, md: 100 },
          }}
          image={confirmImg}
          alt={"confirm image"}
        />
      </>
    );
  };
  const failed = () => {
    return (
      <>
        <Typography
          color="#f34235"
          sx={{ fontWeight: "bold", fontSize: { sm: 26, md: 30 } }}
        >
          ĐÃ XÁC NHẬN HOẶC LỊCH KHÁM KHÔNG TỒN TẠI
        </Typography>
        <CardMedia
          component="img"
          sx={{
            borderRadius: "50%",
            width: { sm: 60, md: 100 },
            height: { sm: 60, md: 100 },
            display: { xs: "none", sm: "block" },
          }}
          image={failedImg}
          alt={"confirm image"}
        />
      </>
    );
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "80%",
          display: "grid",
        }}
      >
        <Stack
          sx={{
            placeSelf: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            p: 3,
          }}
        >
          {isSucceed === true && success()}
          {isSucceed === false && failed()}
        </Stack>
      </Box>
    </>
  );
};

export default PatientConfirmBooking;
