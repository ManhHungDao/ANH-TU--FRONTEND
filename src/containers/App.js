import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
//
import File from "./File/File";

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
          <Router history={this.props.history}>
            <Routes>
              <Route path="/" element={<File />} />
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
