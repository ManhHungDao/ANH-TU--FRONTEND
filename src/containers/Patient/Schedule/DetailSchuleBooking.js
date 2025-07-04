import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box, Stack, Typography, Divider, Grid } from "@mui/material";
import _ from "lodash";
import { Link } from "react-router-dom";

const DetailSchuleBooking = ({ clinic, payment, price }) => {
  return (
    <Stack
      display="flex"
      gap={1}
      direction="column"
      sx={{
        paddingLeft: { lg: 2, md: 0 },
        borderLeft: { lg: "1px solid #ddd", md: "none" },
        maxWidth: "fit-content",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>
        Phòng khám:&nbsp;
        <Link to={`/clinic/${clinic?.id}`} style={{ textDecoration: "none" }}>
          {clinic?.name}
        </Link>
      </Typography>
      <Divider />
      <Box
        sx={{
          backgroundColor: "#f8f8f8",
          border: "1px solid #ddd",
          maxWidth: "fit-content",
        }}
      >
        <Stack
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          direction={"row"}
        >
          <Typography variant="subtitle2" p={1}>
            Giá khám
          </Typography>
          <Typography variant="subtitle2" p={1}>
            {price}
          </Typography>
        </Stack>
        <Divider />
        <Typography variant="subtitle2" p={1}>
          Người bệnh có thể thanh toán chi phí bằng hình thức &nbsp;
          {payment}
        </Typography>
      </Box>
    </Stack>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allcodes: state.admin.allcodes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcode: () => dispatch(actions.fetchAllcodeAction()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailSchuleBooking);
