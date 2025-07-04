import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import _ from "lodash";
// import useIsMobile from "../../../components/useScreen/useIsMobile.js";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  Box,
  CardContent,
  Card,
  Typography,
  CardMedia,
  Divider,
} from "@mui/material";

const DoctorViewMore = ({
  getListUserHome,
  listUser,
  listDoctor,
  getOutStandingDoctor,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getOutStandingDoctor();
  }, []);

  useEffect(() => {
    if (listDoctor.length > 0)
      setData(
        listDoctor.map((e) => ({
          ...e,
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
  }, [listDoctor]);

  useEffect(() => {
    if (listUser && listUser.length > 0)
      setData(
        listUser.map((e) => ({
          ...e,
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
  }, [listUser]);

  const clickDetialDoctor = (id) => {
    navigate(`/detail-doctor/${id}`);
  };
  // const handleEnterSearch = (e) => {
  //   if (e.which === 13) {
  //     getListUserHome(filter);
  //   }
  // };
  useEffect(() => {
    if (filter === "") {
      setData(
        listDoctor.map((e) => ({
          ...e,
          id: e._id,
          name: e.name,
          image: e.image.url,
        }))
      );
    }
  }, [filter]);

  const handleChange = (e) => {
    getListUserHome(e.target.value);
    setFilter(e.target.value);
  };
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
            <FormattedMessage id="home-header.sub-doctor" />
          </span>
        </Typography>
      </Box>
      <Box style={styles.search} p={2}>
        <input
          style={styles.input}
          placeholder="Tìm kiếm"
          onChange={(e) => handleChange(e)}
          // onKeyPress={(e) => handleEnterSearch(e)}
        />
      </Box>
      <Box mt={"80px"}>
        {data &&
          data.length > 0 &&
          data.map((e) => (
            <Card
              key={e.id}
              sx={{
                display: "flex",
                // justifyContent: "flex",
                alignItems: "center",
                p: 1,
                cursor: "pointer",
                borderRadius: 0,
                ":hover": {
                  bgcolor: "#b2ebf2",
                },
                paddingLeft: "16px",
              }}
              onClick={() => clickDetialDoctor(e.id)}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 53,
                  height: 53,
                  borderRadius: "50%",
                }}
                image={e.image ? e.image : ""}
                alt={e.name}
              />
              <CardContent>
                {e.detail?.position?.name}&nbsp;
                {e.name ? e.name : ""}
                <p
                  style={{
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  {e.detail?.specialty?.name ? e.detail.specialty.name : ""}
                </p>
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
    listUser: state.client.listUser,
    listDoctor: state.client.listDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListUserHome: (name) =>
      dispatch(actions.getListUserHomePatientAction(name)),
    getOutStandingDoctor: (email) =>
      dispatch(actions.getOutStandingDoctorAction(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorViewMore);
