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
import HomePacket from "../containers/Patient/Packet/HomePacket";
import DetailPacket from "../containers/Patient/Packet/DetailPacket";
import PatientConfirmBooking from "../containers/Patient/Schedule/Booking/PatientConfirmBooking";
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
              <Route path={path.HOME} element={<HomePacket />} />
              <Route path={path.DETAIL_PACKET} element={<DetailPacket />} />
              <Route
                path={path.CONFIRM_BOOKING}
                element={<PatientConfirmBooking />}
              />

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
