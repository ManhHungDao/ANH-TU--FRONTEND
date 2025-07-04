import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { languages } from "../../../utils";
import Box from "@mui/material/Box";

const RenderNote = ({ curLang }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (curLang === languages.VI)
      setText(
        "HealthCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao."
      );
    else
      setText(
        `HealthCare is the leading comprehensive healthcare platform in Vietnam connecting users with 150 prestigious hospitals - clinics, more than 1,000 good specialists and high quality medical products, services and products.`
      );
  }, [curLang]);

  return (
    <>
      <Box sx={{ backgroundColor: "rgba(255,236,178,1.00)", p: 2 }}>{text}</Box>
    </>
  );
};

export default RenderNote;
