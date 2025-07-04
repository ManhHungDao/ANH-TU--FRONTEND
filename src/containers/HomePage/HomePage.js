import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import HomeHeader from "./Section/Header.js";
import Footer from "./Section/Footer";
import * as actions from "../../store/actions";
import DataSection from "./Section/DataSection.js";
import "./HomePage.scss";
import useIsMobile from "../../components/useScreen/useIsMobile.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hinh2 from "../../assets/discussing.jpg";
import hinh3 from "../../assets/young-asia.jpg";
import hinh4 from "../../assets/portrait.jpg";
import Contact from "./Section/Contact";
import DoctorSection from "./Section/DoctorSection.js";
import HandbookSection from "./Section/HandbookSection";

const HomePage = ({
  listClinic,
  getListClinicHome,
  listSpecialty,
  getListSpecialtyHome,
  listDoctor,
  getOutStandingDoctor,
  listHandbook,
  getAllHandbookHome,
  isLoggedIn,
  getSuggestClinicPatient,
  patientInfo,
  getSuggestDoctorRecent,
}) => {
  const [clinics, setClinics] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [users, setUsers] = useState([]);
  const [handbooks, setHandbooks] = useState([]);
  const [slide, setSlide] = useState("");
  const [showNav, setShowNav] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    getListSpecialtyHome();
    getAllHandbookHome({
      page: 1,
      size: 20,
      specialtyId: "",
      filter: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getSuggestClinicPatient(patientInfo._id);
      getSuggestDoctorRecent(patientInfo.email);
    } else {
      getListClinicHome();
      getOutStandingDoctor();
    }
  }, [isLoggedIn, patientInfo]);

  useEffect(() => {
    if (listSpecialty && listSpecialty.length > 0)
      setSpecialties(
        listSpecialty.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setSpecialties([]);
    }

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

    if (listClinic && listClinic.length > 0)
      setClinics(
        listClinic.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else {
      setClinics([]);
    }
  }, [listClinic, listSpecialty, listHandbook]);

  useEffect(() => {
    if (listDoctor.length > 0)
      setUsers(
        listDoctor.map((e) => ({
          ...e,
          id: e._id,
          name: e.name,
          image: e.image?.url,
        }))
      );
    else {
      setUsers([]);
    }
  }, [listDoctor]);

  // useEffect(() => {
  //   if (listClinic && listClinic.length > 0)
  //     setClinics(
  //       listClinic.map((e) => ({
  //         id: e._id,
  //         name: e.name,
  //         image: e.image.url,
  //       }))
  //     );
  //   else {
  //     setClinics([]);
  //   }
  // }, [listClinic]);

  useEffect(() => {
    if (isMobile) {
      setSlide(2);
      setShowNav(false);
    } else {
      setSlide(4);
      setShowNav(true);
    }
  }, [isMobile]);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <>
      <HomeHeader isShowBanner={true} />
      <div className="home-header-container__slider">
        <Slider {...settings}>
          <div>
            <img className="" src={hinh4} />
          </div>
          <div>
            <img className="" src={hinh2} />
          </div>
          <div>
            <img className="" src={hinh3} />
          </div>
        </Slider>
      </div>
      <DataSection
        data={specialties}
        titleSection={<FormattedMessage id="homepage.specialty-popular" />}
        slidesPerView={slide}
        navigation={showNav}
        linkItem="specialty"
      />
      <DataSection
        data={clinics}
        titleSection={
          isLoggedIn ? (
            "Cơ sở y tế gần nhất"
          ) : (
            <FormattedMessage id="homepage.clinic-popular" />
          )
        }
        slidesPerView={slide}
        navigation={showNav}
        linkItem="clinic"
      />
      <DoctorSection
        data={users}
        titleSection={isLoggedIn ? "Bác sĩ gợi ý" : "Bác sĩ nổi bật gần đây"}
        slidesPerView={slide}
        navigation={showNav}
        linkItem="detail-doctor"
      />
      <HandbookSection
        data={handbooks}
        titleSection={"Cẩm nang"}
        slidesPerView={slide}
        navigation={showNav}
        linkItem="handbook"
      />
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
