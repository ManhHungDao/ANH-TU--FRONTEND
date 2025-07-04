import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../../assets/logo.png";
import { Stack } from "@mui/material";

const PatientLogin = ({ LoginAction, patientInfo, isPatientLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456789");
  const navigate = useNavigate();

  const onClickLogin = () => {
    LoginAction(email, password);
  };
  const handleEnter = (e) => {
    if (e.which === 13) {
      onClickLogin();
    }
  };

  useEffect(() => {
    // if (isPatientLoggedIn === true) navigate("/");
    if (isPatientLoggedIn === true) {
      // if (window.history.state && window.history.state.idx > 0) {
      //   navigate(-1);
      // } else {
      //   navigate("/", { replace: true });
      // }
      navigate("/", { replace: true });
    }
  }, [isPatientLoggedIn]);

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.primary" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" noValidate={false} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => handleEnter(e)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => onClickLogin()}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography
                    variant="subtitle2"
                    // onClick={() => navigate("/patient/register")}
                    sx={{ cursor: "pointer" }}
                    color={"primary"}
                    onClick={() => navigate("/forgot-password")}
                  >
                    Quên mật khẩu
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle2"
                    onClick={() => navigate("/register")}
                    sx={{ cursor: "pointer" }}
                    color={"primary"}
                  >
                    Bạn chưa có tài khoản? Đăng kí
                  </Typography>
                </Grid>
              </Grid>
              <Stack sx={{ mt: 5 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 5, cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  HealthCare-
                  {new Date().getFullYear()}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    patientInfo: state.patient.patientInfo,
    isPatientLoggedIn: state.patient.isPatientLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    LoginAction: (email, password) =>
      dispatch(actions.patientLoginAction(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PatientLogin);
