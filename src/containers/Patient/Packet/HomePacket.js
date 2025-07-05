/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import * as actions from "../../../store/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HomeHeader from "../../HomePage/Section/Header";
import bgpacket from "../../../assets/bg-packet.jpg";
import useIsTablet from "../../../components/useScreen/useIsTablet";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import Footer from "../../HomePage/Section/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePacket.scss";

const HomePacket = ({
  listClinic,
  fetchTypePacketCode,
  typePacket,
  listPacket,
  getAllPacket,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [packets, setPackets] = useState("");
  const [typePackets, setTypePackets] = useState("");
  const [filterClinic, setFilterClinic] = useState("");
  const [filterPacker, setFilterPacker] = useState("");
  const [size, setSize] = useState(8);
  const [page, setPage] = useState(1);
  const [countItem, setCountItem] = useState(0);

  const fetchDataPacket = (page, size, filter, clinicId, type) => {
    const dateFetchPacket = {
      page,
      size,
      filter,
      clinicId,
      type,
    };

    getAllPacket(dateFetchPacket);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const dataFetchClinic = {
      page: 1,
      size: 999,
      filter: "PACKET",
    };
    fetchTypePacketCode(dataFetchClinic);

    fetchDataPacket(page, size, "", "", "");
  }, []);

  useEffect(() => {
    setTypePackets(
      typePacket?.list?.map((e) => ({
        value: e._id,
        name: e.valueVI,
      }))
    );
  }, [listClinic, typePacket]);

  useEffect(() => {
    setPackets(
      listPacket?.list?.map((e) => ({
        id: e._id,
        name: e.name || "",
        image: e.image.url || "",
        price: e.price.name || "",
      }))
    );
    setCountItem(listPacket?.count);
  }, [listPacket]);

  const handleClickReset = () => {
    if (!filterClinic && !filterPacker && !search) return;
    fetchDataPacket(1, size, "", "", "");
    setFilterClinic("");
    setFilterPacker("");
    setSearch("");
    setPage(1);
  };
  const handleChange = (event, type) => {
    setSearch("");
    setPage(1);
    const clinicId = filterClinic ? [filterClinic] : "";
    const typePacket = filterPacker ? [filterPacker] : "";
    const {
      target: { value },
    } = event;
    if (type === "clinic") {
      setFilterClinic(typeof value === "string" ? value.split(",") : value);
      fetchDataPacket(1, size, "", value, typePacket);
    } else {
      setFilterPacker(typeof value === "string" ? value.split(",") : value);
      fetchDataPacket(1, size, "", clinicId, value);
    }
  };

  const handleClickDetailPacket = (id) => {
    navigate(`/packet/${id}`);
  };
  const handleSearchPacket = () => {
    if (!search) return;
    setFilterClinic("");
    setFilterPacker("");
    setPage(1);
    fetchDataPacket(1, size, search, "", "");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const clinicId = filterClinic ? [filterClinic] : "";
    const type = filterPacker ? [filterPacker] : "";
    fetchDataPacket(newPage, size, search, clinicId, type);
  };

  const styles = {
    backgroundImage: `url(${bgpacket})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <>
      <HomeHeader />
      <Stack style={styles}>
        <div
          className="detail-handbook-opacity d-flex flex-column justify-content-center align-items-center"
          style={{
            height: 500,
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "rgb(255, 255, 255)",
              textShadow: `3px 4px 7px rgba(81,67,21,0.8)`,
            }}
          >
            <b>QUẢN LÝ FILE</b>
          </Typography>
          <Box
            sx={{
              bgcolor: "#ffeb3b",
              height: "fit-content",
              width: "50%",
              boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
              position: "absolute",
              top: 410,
              padding: "20px 30px",
            }}
          >
            <div className="mb-3 d-flex align-items-center">
              <FormControl
                fullWidth
                variant="standard"
                sx={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  size="small"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                  }}
                  placeholder="TÌm kiếm tên gói khám"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  endAdornment={
                    <InputAdornment position="end" size="small">
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#ebebeb",
                          color: "#000",
                          textTransform: "capitalize",
                          padding: "3px 5px",
                        }}
                        onClick={handleSearchPacket}
                      >
                        Tìm kiếm
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <Stack
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction={"row"}
              gap={1}
            >
              <FormControl
                sx={{
                  minWidth: 160,
                  bgcolor: "#fff",
                  borderRadius: 2,
                }}
                size="small"
              >
                <InputLabel id="demo-select-small">Loại gói khám</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterPacker}
                  label="Loại gói khám"
                  onChange={(e) => handleChange(e, "packet")}
                >
                  {typePackets &&
                    typePackets.length > 0 &&
                    typePackets.map((e) => (
                      <MenuItem key={e.value || ""} value={e.value || ""}>
                        {e.name || ""}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                sx={{ minWidth: 160, bgcolor: "#fff", borderRadius: 2 }}
                size="small"
              >
                <InputLabel id="demo-select-small">Phòng khám</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterClinic}
                  label="Phòng khám"
                  onChange={(e) => handleChange(e, "clinic")}
                ></Select>
              </FormControl>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={handleClickReset}
              >
                <CachedIcon />
              </IconButton>
            </Stack>
          </Box>
        </div>
      </Stack>
      <Box
        sx={{
          mt: { xs: 20, sm: 20, md: 11 },
        }}
      >
        <Container>
          <div
            className="section-data homepacket__packet"
            style={{ border: "none", padding: 0, marginBottom: "15px" }}
          >
            <div className="container__body mt-5">
              {packets &&
                packets.length > 0 &&
                packets.map((e, index) => (
                  <div
                    className="container__body--item"
                    onClick={() => handleClickDetailPacket(e.id)}
                  >
                    <img src={e.image} alt={e.name} />
                    <div className="container__body--item--title">{e.name}</div>
                    <div className="container__body--item--price">
                      <span>Giá:</span> <span>{e.price}</span>
                    </div>
                  </div>
                ))}
            </div>
            <Stack mt={3}>
              {countItem > size && (
                <span className="d-flex justify-content-center">
                  <Pagination
                    count={Math.ceil(countItem / size)}
                    color="primary"
                    onChange={handleChangePage}
                    page={page}
                  />
                </span>
              )}
            </Stack>
          </div>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listPacket: state.client.listPacket,
    typePacket: state.client.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHomePatientAction()),
    fetchTypePacketCode: (type) =>
      dispatch(actions.fetchAllcodeByTypeHomeAction(type)),
    getAllPacket: (data) =>
      dispatch(actions.getAllPacketPatientHomeAction(data)),
    loadingToggleAction: (id) => dispatch(actions.loadingToggleAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePacket);
