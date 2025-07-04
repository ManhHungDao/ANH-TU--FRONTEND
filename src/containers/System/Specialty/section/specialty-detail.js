import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import { connect } from "react-redux";
import { useEffect, useState } from "react";

const SpecialtyDetail = ({ clinicName, specialtyName }) => {
  const [clinic, setClinic] = useState("");
  const [specialty, setSpecialty] = useState("");
  useEffect(() => {
    setClinic(clinicName);
    setSpecialty(specialtyName);
  }, [clinicName, specialtyName]);
  return (
    <>
      <Card>
        <CardHeader title="Thông tin chung" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-required"
                  label="Phòng khám"
                  fullWidth
                  value={clinic}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  id="outlined-required"
                  label="Chuyên khoa"
                  fullWidth
                  value={specialty}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // allcodeType: state.admin.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // clearStatus: () => dispatch(actions.clearStatus()),
    // fetchAllcodeByTypeAction: (type) =>
    //   dispatch(actions.fetchAllcodeByTypeAction(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
