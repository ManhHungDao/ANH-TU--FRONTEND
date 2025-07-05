import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { path } from "../utils";
import Login from "./Auth/login";
import AdminRoute from "../routes/AdminRoute";
import DoctorRoute from "../routes/DoctorRoute";
import PatientRoute from "../routes/PatientRoute";
import Loading from "../components/Loading";
import SystemAuthRoute from "../hoc/SystemAuthRoute";
import PatienAuthtRoute from "../hoc/PatienAuthtRoute";
//
import HomePage from "../containers/HomePage/HomePage";
import DetailDoctor from "../containers/Patient/Doctor/DetailDoctor";
import DetailSpecialty from "../containers/Patient/Specialty/DetailSpecialty";
import DetailClinic from "../containers/Patient/Clinic/DetailClinic";
import DetailHandbook from "../containers/Patient/Handbook/DetailHandbook";
import HomePacket from "../containers/Patient/Packet/HomePacket";
import DetailPacket from "../containers/Patient/Packet/DetailPacket";
import PatientConfirmBooking from "../containers/Patient/Schedule/Booking/PatientConfirmBooking";
import HomeHandbook from "../containers/Patient/Handbook/HomeHandbook";
import Feedback from "../containers/Patient/Feedback/Feedback";
import PatientLogin from "../containers/Patient/Auth/Login";
import PatientRegister from "../containers/Patient/Auth/Register";
import ForgotPassword from "../containers/Patient/Auth/ForgotPassword";
import AssistantRoute from "../routes/AssistantRoute";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <>
        <Loading />
        <BrowserRouter>
          <Router history={history}>
            <Routes>
              <Route path={path.HOME} element={<HomePage />} />
              <Route path={path.SPECIALTY} element={<DetailSpecialty />} />
              <Route path={path.CLINIC} element={<DetailClinic />} />
              <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
              <Route path={path.HANDBOOK} element={<HomeHandbook />} />
              <Route path={path.DETAIL_HANDBOOK} element={<DetailHandbook />} />

              <Route path={path.PACKET} element={<HomePacket />} />
              <Route path={path.DETAIL_PACKET} element={<DetailPacket />} />
              <Route
                path={path.CONFIRM_BOOKING}
                element={<PatientConfirmBooking />}
              />
              <Route path={path.FEEDBACK} element={<Feedback />} />

              {/* manager account patient */}
              <Route path={path.LOGIN} element={<PatientLogin />} />
              <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
              <Route path={path.RESGISTER} element={<PatientRegister />} />

              {/* route control */}
              <Route path={path.SYSTEM_LOGIN} element={<Login />} />
              <Route
                path={path.PATIENT}
                element={
                  <PatienAuthtRoute>
                    <PatientRoute />
                  </PatienAuthtRoute>
                }
              />
              <Route
                path={path.ADMIN}
                element={
                  <SystemAuthRoute>
                    <AdminRoute />
                  </SystemAuthRoute>
                }
              />
              <Route
                path={path.DOCTOR}
                element={
                  <SystemAuthRoute>
                    <DoctorRoute />
                  </SystemAuthRoute>
                }
              />
              <Route
                path={path.ASSISTANT}
                element={
                  <SystemAuthRoute>
                    <AssistantRoute />
                  </SystemAuthRoute>
                }
              />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover={false}
              pauseOnFocusLoss={false}
            />
          </Router>
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
