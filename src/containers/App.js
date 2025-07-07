import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { path } from "../utils";
import AdminRoute from "../routes/AdminRoute";
import DoctorRoute from "../routes/DoctorRoute";
import Loading from "../components/Loading";
import SystemAuthRoute from "../hoc/SystemAuthRoute";
//
import File from "./File/File";
import FileDetail from "./File/FileDetail";
import Addfile from "./System/Admin/Addfile";

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
              <Route path={path.HOME} element={<File />} />
              <Route path={path.DETAIL_PACKET} element={<FileDetail />} />
              <Route path="/add" element={<Addfile />} />

              {/* route control */}

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
