import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Header from "../../../../components/Header.jsx";
import { Box, Grid } from "@mui/material";
import ProfileAccount from "./section/ProfileAccount";
import TableBookingAccount from "./section/TableBookingAccount";

const DetailAccount = () => {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <>
      {!data ? (
        <Box m="20px">
          <Header title="Chi tiết đặt khám" />
        </Box>
      ) : (
        <Box m="20px">
          <Header title="Chi tiết đặt khám" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ProfileAccount data={data} />
            </Grid>
            <Grid item xs={12} md={8}>
              <TableBookingAccount data={data} />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default DetailAccount;
