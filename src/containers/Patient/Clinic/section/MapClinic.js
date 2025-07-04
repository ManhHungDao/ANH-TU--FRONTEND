import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import GoogleMaps from "../../../../components/maps/GoogleMaps";

const MapClinic = ({ address, name }) => {
  useEffect(() => {
    setSelected([+address.lat, +address.lng]);
  }, []);
  const [zoom, setZoom] = useState(17);
  const [selected, setSelected] = useState([10.7578712, 106.6595379]);

  return (
    <Stack
      className="contact_map_body"
      sx={{
        width: "100%",
        height: { xs: 500, lg: 700 },
        mt: 2,
        mb: 2,
      }}
    >
      <GoogleMaps
        lat={+address.lat}
        long={+address.lng}
        load={true}
        zoom={zoom}
        center={selected}
        name={name}
        // idSelect={""}
      />
    </Stack>
  );
};

export default MapClinic;
