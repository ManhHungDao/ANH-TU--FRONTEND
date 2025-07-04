/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  Grid,
  Stack,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Divider,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import * as actions from "../../../store/actions";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HomeHeader from "../../HomePage/Section/Header";
import document from "../../../assets/document.jpg";
import useIsTablet from "../../../components/useScreen/useIsTablet";
import useIsMobile from "../../../components/useScreen/useIsMobile";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import { getAllHandbook } from "../../../services/handbookService.js";
import Footer from "../../HomePage/Section/Footer";
import Slider from "react-slick";
import BackToTop from "../../../components/BackToTop ";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

const HomeHandbook = ({
  listHandbook,
  getAllSpecialtyInHandbook,
  listSpecialtyInHandbook,
  getAllHandbookAction,
}) => {
  const smsScreen = useIsTablet();
  const mobiScreen = useIsMobile();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [size, setSize] = useState(16);
  const [page, setPage] = useState(1);
  const [handbooks, setHandbooks] = useState([]);
  const [countItem, setCountItem] = useState(0);

  const getDataHandbook = (page, size, filter, specialtyId) => {
    const dataFetchPacket = {
      page,
      size,
      filter,
      specialtyId,
    };
    getAllHandbookAction(dataFetchPacket);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getDataHandbook(page, size, "", "");
    getAllSpecialtyInHandbook();
  }, []);

  useEffect(() => {
    setSpecialties(
      listSpecialtyInHandbook.map((e) => ({
        value: e.id,
        name: e.name,
      }))
    );
  }, [listSpecialtyInHandbook]);

  useEffect(() => {
    setHandbooks(
      listHandbook?.list?.map((e) => ({
        id: e._id,
        name: e.name || "",
        image: e.image.url || "",
      }))
    );
    setCountItem(listHandbook?.count);
  }, [listHandbook]);

  const handleClickReset = () => {
    if (!filterSpecialty && !search) return;
    getDataHandbook(1, size, "", "");
    setFilterSpecialty("");
    setSearch("");
    setPage(1);
  };
  const handleChange = (event, type) => {
    setSearch("");
    setPage(1);
    const {
      target: { value },
    } = event;
    setFilterSpecialty(typeof value === "string" ? value.split(",") : value);
    getDataHandbook(1, size, "", value);
  };
  const handleClickDetailHandbook = (id) => {
    navigate(`/handbook/${id}`);
  };
  const handleSearchHandbook = () => {
    if (!search) return;
    setFilterSpecialty("");
    setPage(1);
    getDataHandbook(1, size, search, "", "");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const type = filterSpecialty ? [filterSpecialty] : "";
    getDataHandbook(newPage, size, search, type);
  };

  const styles = {
    backgroundImage: `url(${document})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
      <HomeHeader />
      <Stack style={styles}>
        <div
          className="detail-handbook-opacity d-flex flex-column justify-content-center align-items-center"
          style={{
            height: smsScreen ? 200 : 500,
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
            <b>CẨM NANG TỔNG HỢP</b>
          </Typography>
          <Box
            sx={{
              bgcolor: "#ffeb3b",
              height: "fit-content",
              width: smsScreen ? "100%" : "50%",
              boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
              position: "absolute",
              top: smsScreen ? 200 : 410,
              padding: "20px 30px",
            }}
          >
            <div className="mb-3 d-flex align-items-center">
              <FormControl
                fullWidth
                variant="standard"
                sx={{
                  width: mobiScreen ? "85%" : "100%",
                }}
              >
                <OutlinedInput
                  size="small"
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                  }}
                  placeholder="TÌm kiếm tên cẩm nang"
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
                        onClick={handleSearchHandbook}
                      >
                        Tìm kiếm
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {mobiScreen && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    marginLeft: 2,
                  }}
                  onClick={handleClickReset}
                >
                  <CachedIcon />
                </IconButton>
              )}
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
                <InputLabel id="demo-select-small">Chuyên khoa</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={filterSpecialty}
                  label="Chuyên khoa"
                  onChange={(e) => handleChange(e)}
                >
                  {specialties &&
                    specialties.length > 0 &&
                    specialties.map((e) => (
                      <MenuItem key={e.value || ""} value={e.value || ""}>
                        {e.name || ""}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {!mobiScreen && (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  onClick={handleClickReset}
                >
                  <CachedIcon />
                </IconButton>
              )}
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
          {!mobiScreen && (
            <div
              className="section-data homepacket__packet homepacket__handbook"
              style={{ border: "none", padding: 0 }}
            >
              <div className="container__header d-flex justify-content-between align-items-center mb-2">
                <div className="container__header--title">Cẩm nang nổi bật</div>
                {/* <div
                  className="container__header--btn"
                  //   onClick={() => handleClickViewMore()}
                >
                  <FormattedMessage id="homepage.more-info" />
                </div> */}
              </div>
              <Divider />
              <div className="container__body mt-5">
                {handbooks &&
                  handbooks.length > 0 &&
                  handbooks.map((e, index) => (
                    <div
                      className="container__body--item"
                      onClick={() => handleClickDetailHandbook(e.id)}
                    >
                      <img src={e.image} alt={e.name} />
                      <div className="container__body--item--title">
                        {e.name}
                      </div>
                    </div>
                  ))}
              </div>
              <Stack mt={3}>
                {countItem > size && (
                  <span className="d-flex justify-content-center m-2">
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
          )}
          {mobiScreen && (
            <div
              className="section-data HomeHandbook__clinic mt-5"
              style={{ borderTop: "none", padding: 0, backgroundColor: "#fff" }}
            >
              <div className="container__header d-flex justify-content-between align-items-center mb-2">
                <div className="container__header--title">Gói nổi bật</div>
                {/* <div
                  className="container__header--btn"
                  //   onClick={() => handleClickViewMoreSpecialty()}
                >
                  <FormattedMessage id="homepage.more-info" />
                </div> */}
              </div>
              <Divider />
              <div className="container__body mt-5">
                <Slider {...settings}>
                  {handbooks &&
                    handbooks.length > 0 &&
                    handbooks.map((e, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center"
                      >
                        <div
                          className="container__body--item"
                          onClick={() => handleClickDetailHandbook(e.id)}
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
            </div>
          )}
        </Container>
      </Box>
      <Footer />
      <BackToTop />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listSpecialtyInHandbook: state.admin.listSpecialtyInHandbook,
    listHandbook: state.client.listHandbook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTypePacketCode: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
    getAllSpecialtyInHandbook: () =>
      dispatch(actions.getAllSpecialtyInHandbookAction()),
    getAllHandbookAction: (data) =>
      dispatch(actions.getAllHandbookHomePatientAction(data)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHandbook);
