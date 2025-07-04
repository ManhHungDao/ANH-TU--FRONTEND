import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImg from "../../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      HealthCare-
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

const SignInSide = ({ loginAction, isLoggedIn, processLogout, userInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456Aa.");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.roleId) {
      if (userInfo.roleId === "R3")
        return isLoggedIn === true ? navigate("/doctor") : "";
      else if (userInfo.roleId === "R4")
        return isLoggedIn === true ? navigate("/assistant") : "";
      else return isLoggedIn === true ? navigate("/admin") : "";
    }
  }, [isLoggedIn, userInfo]);

  const onClick = () => {
    loginAction(email, password);
  };
  const handleEnter = (e) => {
    if (e.which === 13) {
      onClick();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "center center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.indigo" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              noValidate={false}
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
                onClick={onClick}
              >
                Đăng nhập
              </Button>
            </Box>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (email, password) =>
      dispatch(actions.loginAction(email, password)),
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);
