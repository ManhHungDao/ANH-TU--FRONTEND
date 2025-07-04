import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "@mui/material";

const DataSection = ({ data, titleSection, nameBtn, linkItem }) => {
  const navigate = useNavigate();
  const handleClickItem = (id) => {
    navigate(`${linkItem}/${id}`);
  };
  const handleClickViewMore = () => {
    navigate(`/viewmore/${linkItem}`);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="section-data">
        <Container>
          <div className="container__header d-flex justify-content-between align-items-center mb-2">
            <div className="container__header--title">{titleSection}</div>
            <div
              className="container__header--btn"
              onClick={() => handleClickViewMore()}
            >
              {nameBtn ? nameBtn : <FormattedMessage id="homepage.more-info" />}
            </div>
          </div>
          <div className="container__body">
            <Slider {...settings}>
              {data &&
                data.length > 0 &&
                data.map((e, index) => (
                  <div key={index} className="d-flex justify-content-center">
                    <div
                      className="container__body--item"
                      onClick={() => handleClickItem(e.id)}
                    >
                      <img src={e.image} alt={e.name} />
                      <div className="container__body--item--title">
                        {e.name}
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DataSection;
