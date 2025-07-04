import React, { useEffect, useState } from "react";
import { Box, Stack, Pagination, Divider } from "@mui/material";
import ProfileDoctor from "../../Doctor/ProfileDoctor";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import {
  getAllUserService,
  getAllDoctorBySpecialtyOfClinicHome,
} from "../../../../services/userService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DoctorList = ({
  id,
  getSpecialty,
  listSpecialty,
  loadingToggleAction,
}) => {
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(1);
  const [speciaties, setSpeciaties] = useState([]);
  const [filterSpecialty, setFilterSpecialty] = useState("");

  const fetchDataAPI = async (page, size, filter = "") => {
    const data = {
      page,
      size,
      filter,
      clinicId: id,
    };
    // loadingToggleAction(true);
    const res = await getAllUserService(data);
    if (res && res.success) {
      setDoctors(
        res?.users.map((i) => {
          return {
            id: i._id,
          };
        })
      );
      setCount(res?.count);
    }
    // loadingToggleAction(false);
  };

  const fetchDataBySpecialtyAPI = async (page, size, specialtyId) => {
    const data = {
      page,
      size,
      specialtyId,
      clinicId: id,
    };
    loadingToggleAction(true);
    const res = await getAllDoctorBySpecialtyOfClinicHome(data);
    if (res && res.success) {
      setDoctors(
        res?.users.map((i) => {
          return {
            id: i._id,
          };
        })
      );
      setCount(res?.count);
    }
    loadingToggleAction(false);
  };

  useEffect(() => {
    fetchDataAPI(page, size, "");
    getSpecialty(id);
  }, []);

  useEffect(() => {
    setSpeciaties(listSpecialty.map((e) => ({ value: e.key, name: e.name })));
  }, [listSpecialty]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage, size, "");
  };

  const handleChange = (event, type) => {
    setPage(1);
    const {
      target: { value },
    } = event;
    setFilterSpecialty(typeof value === "string" ? value.split(",") : value);
    fetchDataBySpecialtyAPI(1, size, value);
  };

  return (
    <Box
      sx={{
        mt: 3,
        mb: 3,
      }}
    >
      <Stack
        display="flex"
        justifyContent="flex-center"
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
            {speciaties &&
              speciaties.length > 0 &&
              speciaties.map((e) => (
                <MenuItem key={e.value || ""} value={e.value || ""}>
                  {e.name || ""}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
      {doctors &&
        doctors.map((e, i) => (
          <div
            key={e + i + ""}
            style={{
              backgroundColor: "#fff",
              borderRadius: "4px",
              margin: "10px 0",
            }}
          >
            <Stack
              sx={{
                boxShadow: `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`,
                borderRadius: "4px",
                padding: "7px",
              }}
            >
              <Stack
                sx={{
                  marginLeft: { sm: 0, lg: "140px" },
                }}
              >
                <ProfileDoctor id={e.id} />
              </Stack>
            </Stack>
          </div>
        ))}
      <Stack mt={3}>
        {count > size && (
          <span className="d-flex justify-content-center">
            <Pagination
              count={Math.ceil(count / size)}
              color="primary"
              onChange={handleChangePage}
              page={page}
            />
          </span>
        )}
      </Stack>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listSpecialty: state.client.listSpecialtyInClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialty: (id) =>
      dispatch(actions.getSpecialtyByClinicIdHomeAction(id)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorList);
