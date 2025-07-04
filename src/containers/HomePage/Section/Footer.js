/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.scss";
import { Container } from "@mui/material";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import { useNavigate } from "react-router-dom";

const HomeFooter = () => {
  const smScreen = useIsMobile();
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <div className="company-info">
          <div
            className="lg"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          ></div>
          <div className="address">
            <p>Công ty Cổ phần Công nghệ HealthCare</p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
            </p>
            <p>
              <i className="fas fa-check"></i>
              ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
            </p>
          </div>
        </div>
        {!smScreen && (
          <div className="company-headquarters">
            <span>
              <p className="name">Trụ sở tại Hà Nội</p>
              28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
            </span>
            <span>
              <p className="name">Văn phòng tại TP Hồ Chí Minh</p>
              Số 01, Hồ Bá Kiện, Phường 15, Quận 10
            </span>
          </div>
        )}
      </Container>
      <div className="author">
        <p>&copy; 2022 Đào Mạnh Hùng.</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
