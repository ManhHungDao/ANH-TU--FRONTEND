import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Footer from "../../HomePage/Section/Footer";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stack,
  Divider,
  Pagination,
} from "@mui/material";
import _ from "lodash";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SubHeader from "../../HomePage/Section/SubHeader";
import "./DetailSpecialty.scss";
import { getSingleSpecialty } from "../../../services/specialtySerivce";
import {
  getAllUserBySpecialtyHome,
  getAllDoctorByProvince,
} from "../../../services/userService";
import { getAllSpecialtyClinic } from "../../../services/clinicService";

import ProfileDoctor from "../Doctor/ProfileDoctor";

const DetailSpecialty = ({ specialty, loadingToggleAction }) => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [selectProvince, setSelectProvince] = useState("");
  const [idSpecialty, setIdSpecialty] = useState("");
  const [size, setSize] = useState(4);
  const [page, setPage] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [count, setCount] = useState(1);

  const getDataDoctorByProvince = async (page, size, province) => {
    // loadingToggleAction(true);
    let res = await getAllDoctorByProvince({
      page,
      size,
      id: idSpecialty,
      province,
    });
    if (res && res.success) {
      setDoctors(
        res.users.map((e) => ({
          id: e._id,
        }))
      );
      setCount(res.count);
    }
    // loadingToggleAction(false);
  };

  const getDataProvince = async () => {
    let res = await getAllSpecialtyClinic();
    if (res && res.success) {
      setListProvince(res.list.map((e) => e._id));
    }
  };

  const getDataSpecialty = async () => {
    try {
      // loadingToggleAction(true);
      let res = await getSingleSpecialty(id);
      if (res && res.success) {
        let idSpecialty = res.specialty.key;
        setData(res.specialty);
        setIdSpecialty(idSpecialty);
        // gọi lấy data bác sĩ

        let resSpe = await getAllUserBySpecialtyHome({
          page,
          size,
          id: idSpecialty,
        });
        if (resSpe && resSpe.success) {
          setDoctors(
            resSpe.users.map((e) => ({
              id: e._id,
            }))
          );
          setCount(resSpe.count);
        }
      }
      // loadingToggleAction(false);
    } catch (error) {
      // loadingToggleAction(false);
      console.log("🚀 ~ error:", error);
    }
  };

  const getDataDocTor = async (page, size) => {
    // loadingToggleAction(true);
    let res = await getAllUserBySpecialtyHome({ page, size, id: idSpecialty });
    if (res && res.success) {
      setDoctors(
        res.users.map((e) => ({
          id: e._id,
        }))
      );
      setCount(res.count);
    }
    // loadingToggleAction(false);
  };

  useEffect(() => {
    getDataSpecialty();
    getDataProvince();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (!selectProvince) getDataDocTor(newPage, size);
    else {
      getDataDoctorByProvince(newPage, size, [selectProvince]);
    }
  };
  const handleChange = (event, type) => {
    setPage(1);
    const {
      target: { value },
    } = event;
    setSelectProvince(typeof value === "string" ? value.split(",") : value);
    getDataDoctorByProvince(1, size, value);
  };
  const styles = {
    backgroundImage: `url(${specialty?.image?.url ? specialty.image.url : ""})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };
  return (
    <>
      <SubHeader />
      <Stack className="detail-specialty">
        <Stack style={styles}>
          <div className="detail-specialty-opacity">
            <Container className="detail-specialty--detail">
              <span
                className="detail"
                dangerouslySetInnerHTML={{ __html: data.detail }}
              ></span>
            </Container>
          </div>
        </Stack>
        <Stack sx={{ backgroundColor: "#eee" }}>
          <Container>
            <Stack
              display="flex"
              justifyContent="flex-center"
              alignItems="center"
              direction={"row"}
              gap={1}
              mt={2}
            >
              <FormControl
                sx={{
                  minWidth: 160,
                  bgcolor: "#fff",
                  borderRadius: 2,
                }}
                size="small"
              >
                <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={selectProvince}
                  label="Thành phố"
                  onChange={(e) => handleChange(e)}
                >
                  {listProvince.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Box m={0}>
              {doctors &&
                doctors.map((e, i) => (
                  <div
                    key={e + i + ""}
                    style={{
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: "4px",
                      margin: "10px 0",
                      paddingBottom: 0,
                    }}
                  >
                    <Stack
                      sx={{
                        marginLeft: { sm: 0, lg: "140px" },
                      }}
                    >
                      <ProfileDoctor id={e.id} />
                    </Stack>
                  </div>
                ))}
            </Box>
            <Stack>
              <span className="d-flex justify-content-center mb-3">
                {count > size && (
                  <Pagination
                    count={Math.ceil(count / size)}
                    color="primary"
                    onChange={handleChangePage}
                    defaultPage={page}
                  />
                )}
              </span>
            </Stack>
          </Container>
        </Stack>
      </Stack>
      <Divider />
      <Footer />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    specialty: state.client.specialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleSpecialty: (id) =>
      dispatch(actions.getSingleSpecialtyPatientAction(id)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
