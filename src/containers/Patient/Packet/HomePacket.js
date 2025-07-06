/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Stack, Box, IconButton, Button, Container } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import * as actions from "../../../store/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HomeHeader from "../../HomePage/Section/Header";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePacket.scss";
import image from "../../../assets/word.png";

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
  const [size, setSize] = useState(18);
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
    navigate(`/${id}`);
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

  return (
    <>
      <HomeHeader />
      <Stack>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            height: 200,
            marginTop: "30px",
          }}
        >
          <Box
            sx={{
              bgcolor: "#64b9e5",
              height: "fit-content",
              width: "50%",
              // boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
              padding: "20px 30px",
              borderRadius: 2,
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
                  placeholder="TÌm kiếm theo từ khóa"
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
                <InputLabel id="demo-select-small">Loại án</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterPacker}
                  label="Loại án"
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
                <InputLabel id="demo-select-small">Ngày tháng</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterClinic}
                  label="Ngày tháng"
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
      <Container>
        <div
          className="section-data homepacket__packet"
          style={{ border: "none", padding: 0, marginBottom: "15px" }}
        >
          <div className="container__body">
            {packets &&
              packets.length > 0 &&
              packets.map((e, index) => (
                <div
                  className="container__body--item"
                  onClick={() => handleClickDetailPacket(e.id)}
                >
                  <span style={{ display: "flex", justifyContent: "center" }}>
                    <img src={image} alt={e.name} />
                  </span>
                  <div className="container__body--item--title">{e.name}</div>
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
