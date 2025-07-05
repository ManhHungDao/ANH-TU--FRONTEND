import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import HomeHeader from "./Section/Header.js";
import Footer from "./Section/Footer";
import * as actions from "../../store/actions";
import "./HomePage.scss";
import useIsMobile from "../../components/useScreen/useIsMobile.js";
import Contact from "./Section/Contact";

const HomePage = ({ listHandbook, getAllHandbookHome, isLoggedIn }) => {
  const [specialties, setSpecialties] = useState([]);
  const [handbooks, setHandbooks] = useState([]);
  const [slide, setSlide] = useState("");
  const [showNav, setShowNav] = useState("");

  useEffect(() => {
    getAllHandbookHome({
      page: 1,
      size: 20,
      specialtyId: "",
      filter: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (listHandbook?.list && listHandbook.list.length > 0)
      setHandbooks(
        listHandbook.list.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setHandbooks([]);
    }
  }, [listHandbook]);

  return (
    <>
      <HomeHeader isShowBanner={true} />
      <Footer />
      <Contact />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    patientInfo: state.patient.patientInfo,
    isLoggedIn: state.patient.isPatientLoggedIn,
    listClinic: state.client.listClinic,
    listSpecialty: state.client.listSpecialty,
    listDoctor: state.client.listDoctor,
    listHandbook: state.client.listHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHandbookHome: (data) =>
      dispatch(actions.getAllHandbookHomePatientAction(data)),
    getListClinicHome: () => dispatch(actions.getListClinicHomePatientAction()),
    getListSpecialtyHome: () =>
      dispatch(actions.getListSpecialtyHomePatientAction("")),
    getSuggestClinicPatient: (id) =>
      dispatch(actions.getSuggestClinicPatientAction(id)),
    getSuggestDoctorRecent: (email) =>
      dispatch(actions.getSuggestDoctorRecentAction(email)),
    getOutStandingDoctor: () => dispatch(actions.getOutStandingDoctorAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
