import React, { useEffect, useState } from "react";
import { Box, Stack, Pagination } from "@mui/material";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { getAllPacket } from "../../../../services/packetService";
import ProfilePacket from "../../Packet/ProfilePacket";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PacketList = ({
  id,
  fetchTypePacketCode,
  typePacket,
  loadingToggleAction,
}) => {
  const [packets, setPackets] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [count, setCount] = useState(1);
  const [typePackets, setTypePackets] = useState("");
  const [filterPacker, setFilterPacker] = useState("");

  const fetchDataAPI = async (page, size, type) => {
    const data = {
      page,
      size,
      filter: "",
      clinicId: id,
      type,
    };
    // loadingToggleAction(true);
    const res = await getAllPacket(data);
    if (res && res.success) {
      setPackets(
        res?.packets.map((i) => {
          return {
            id: i._id,
          };
        })
      );
      setCount(res?.count);
    }
    // loadingToggleAction(false);
  };

  useEffect(() => {
    fetchDataAPI(page, size, "");
    fetchTypePacketCode({
      page: 1,
      size: 999,
      filter: "PACKET",
    });
  }, []);

  useEffect(() => {
    setTypePackets(
      typePacket?.list?.map((e) => ({
        value: e._id,
        name: e.valueVI,
      }))
    );
  }, [typePacket]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage, size, "");
  };

  const handleChange = (event, type) => {
    setPage(1);
    const {
      target: { value },
    } = event;
    setFilterPacker(typeof value === "string" ? value.split(",") : value);
    fetchDataAPI(1, size, value);
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
          <InputLabel id="demo-select-small">Loại gói khám</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={filterPacker}
            label="Loại gói khám"
            onChange={(e) => handleChange(e)}
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
      </Stack>
      {packets &&
        packets.map((e, i) => (
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
              // sx={{
              //   marginLeft: { sm: 0, lg: "140px" },
              // }}
              >
                <ProfilePacket id={e.id} />
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
    typePacket: state.client.allcodeType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTypePacketCode: (type) =>
      dispatch(actions.fetchAllcodeByTypeHomeAction(type)),
    loadingToggleAction: (status) =>
      dispatch(actions.loadingToggleAction(status)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PacketList);
