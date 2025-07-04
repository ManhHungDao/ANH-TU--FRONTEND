import React, { useState, useEffect, Component } from "react";
import GoogleMap from "google-map-react";
import image from "../../assets/placeholder.png";
import PropTypes from "prop-types";
import "./mapStyle.css";

const AnyReactComponent = ({ text, id, selectd, lat, lng, phones }) => {
  const onClickPlace = () => {
    window.open("https://maps.google.com?q=" + lat + "," + lng);
  };

  return (
    <div
      className="google_map"
      // style={{
      //   position: "relative",
      // }}
    >
      <div className="hint">
        <div
          className="hint__content"
          onClick={() => {
            onClickPlace();
          }}
        >
          <h5>{text}</h5>
        </div>
      </div>
      <img src={image} style={{ width: "30px ", height: "30px " }} alt="map" />
    </div>
  );
};

function GoogleMaps(props) {
  return (
    <>
      <GoogleMap
        apiKey={"AIzaSyBVjJC0YfitZBQ16t7fnPvK7R8nvFY9CN0"}
        center={props.center}
        zoom={props.zoom}
        hoverDistance={40 / 2}
      >
        {props.data &&
          props.data.map((item, index) => {
            return (
              <AnyReactComponent
                key={index}
                selectd={
                  props.idSelect !== "" ? item.id === props.idSelect : true
                }
                lat={item?.address.lat}
                lng={item?.address.lng}
                text={item?.name}
              />
            );
          })}
        {!props.data && (
          <AnyReactComponent
            lat={props.lat}
            lng={props.long}
            text={props.name}
          />
        )}
      </GoogleMap>
    </>
  );
}

GoogleMaps.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  greatPlaceCoords: PropTypes.any,
  lat: PropTypes.number,
  long: PropTypes.number,
  name: PropTypes.string,
};

export default GoogleMaps;
