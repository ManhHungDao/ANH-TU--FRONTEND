import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import _ from "lodash";
// import useIsMobile from "../../../components/useScreen/useIsMobile.js";
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  Box,
  CardContent,
  Card,
  Typography,
  CardMedia,
  Divider,
} from "@mui/material";

const DataSectionViewMore = ({
  getListSpecialtyHome,
  listSpecialty,
  listClinic,
}) => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.pathname.includes("clinic")) {
      setTitle("Cơ sở y tế nổi bật");
    } else {
      getListSpecialtyHome("");
      setTitle("Chuyên khoa phổ biến");
    }
  }, [location]);

  useEffect(() => {
    setData([]);
    if (location.pathname.includes("clinic"))
      setData(
        listClinic.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    else
      setData(
        listSpecialty.map((e) => ({
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
  }, [listSpecialty, listClinic]);

  const clickDetailSpecialty = (id) => {
    if (location.pathname.includes("clinic")) navigate(`/clinic/${id}`);
    else navigate(`/specialty/${id}`);
  };
  // const handleEnterSearch = (e) => {
  //   if (e.which === 13) {
  //     getListSpecialtyHome(filter);
  //   }
  // };
  const handleChange = (e) => getListSpecialtyHome(e.target.value);
  const navigate = useNavigate();
  const styles = {
    header: {
      height: "50px",
      zIndex: 10,
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      overflowY: " scroll",
      boxShadow: `rgba(0, 0, 0, 0.45) 0px 25px 20px -20px`,
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    search: {
      marginTop: "50px",
      height: "30px",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      overflowY: " scroll",
      backgroundColor: "#eee",
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      height: "24px",
      borderRadius: 15,
      paddingLeft: "15px",
      fontSize: "12px",
      border: "1px solid #ddd",
      outline: "none",
    },
  };
  return (
    <>
      <Box style={styles.header} p={2}>
        <Typography
          sx={{ fontSize: 16, cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-long-arrow-alt-left icon-goback"></i>
          <span style={{ fontSize: 16, marginLeft: 5 }}>
            {/* <FormattedMessage id="home-header.sub-doctor" /> */}
            {title}
          </span>
        </Typography>
      </Box>
      {!location.pathname.includes("clinic") && (
        <Box style={styles.search} p={2}>
          <input
            style={styles.input}
            placeholder={"Tìm kiếm"}
            onChange={(e) => handleChange(e)}
            // onKeyPress={(e) => handleEnterSearch(e)}
          />
        </Box>
      )}
      <Box mt={location.pathname.includes("clinic") ? "50px" : "80px"}>
        {data &&
          data.length > 0 &&
          data.map((e) => (
            <Card
              key={e.id}
              sx={{
                display: "flex",
                // justifyContent: "flex",
                // alignItems: "center",
                p: 2,
                cursor: "pointer",
                borderRadius: 0,
                ":hover": {
                  bgcolor: "#b2ebf2",
                },
              }}
              onClick={() => clickDetailSpecialty(e.id)}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 80,
                  height: 53,
                  //   display: { xs: "none", sm: "block" },
                }}
                image={e.image ? e.image : ""}
                alt={e.name}
              />
              <CardContent
                sx={{
                  padding: 0,
                  paddingLeft: 2,
                }}
              >
                {e.name ? e.name : ""}
              </CardContent>
              <Divider />
            </Card>
          ))}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listClinic: state.client.listClinic,
    listSpecialty: state.client.listSpecialty,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListSpecialtyHome: (name) =>
      dispatch(actions.getListSpecialtyHomePatientAction(name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSectionViewMore);
