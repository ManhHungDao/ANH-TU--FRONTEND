import { connect } from "react-redux";
import { Box, Grid, Button, Stack } from "@mui/material";
import * as actions from "../../../store/actions";
import Header from "../../../components/Header";
import StatBox from "../../../components/StatBox";
import iconsHospital from "../../../assets/icon-dashboard/hospital.png";
import iconDoctor from "../../../assets/icon-dashboard/doctor.png";
import iconSpecialty from "../../../assets/icon-dashboard/specialty.png";
import iconUser from "../../../assets/icon-dashboard/user.png";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useEffect, useState } from "react";
import ModalReport from "./modalReport";

const Dashboard = ({ getAllCountAction, count, userInfo }) => {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(15);
  const [selected, setSelected] = useState([21.0161926, 105.8486047]);
  // '21.0161926', lng: '105.8486047'

  useEffect(() => {
    getAllCountAction();
  }, []);

  useEffect(() => {
    if (count) {
      setData(count);
    }
  }, [count]);

  return (
    <>
      <Box m="20px">
        <Stack
          display={"flex"}
          sx={{
            flexDirection: { sm: "column", md: "row" },
            justifyContent: { sm: "flex-start", md: "space-between" },
            alignItems: { sm: "flex-start", md: "center" },
          }}
        >
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
          {(userInfo.roleId === "R1" || userInfo.roleId === "R0") && (
            <Box sx={{ mb: 2 }}>
              <Button
                sx={{
                  backgroundColor: "#94e2cd",
                  color: "#141414",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  ":hover": {
                    bgcolor: "#1e5245",
                    color: "#fff",
                  },
                }}
                onClick={() => setOpen(true)}
              >
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Tải báo cáo
              </Button>
            </Box>
          )}
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <StatBox
              title={data?.clinic ? data.clinic : "0"}
              subtitle="Cơ sở khám"
              img={iconsHospital}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <StatBox
              title={data?.user ? data.user : "0"}
              subtitle="Bác sĩ"
              img={iconDoctor}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <StatBox
              title={data?.patient ? data.patient : "0"}
              subtitle="Người dùng"
              img={iconUser}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <StatBox
              title={data?.schedule ? data.schedule : "0"}
              subtitle="Khám thành công"
              img={iconSpecialty}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack
              className="contact_map_body"
              sx={{
                width: "100%",
                height: { xs: 500, lg: 650 },
              }}
            ></Stack>
          </Grid>
        </Grid>
      </Box>
      <ModalReport open={open} setOpen={setOpen} />
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  count: state.user.count,
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountAction: () => dispatch(actions.getAllCountAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
