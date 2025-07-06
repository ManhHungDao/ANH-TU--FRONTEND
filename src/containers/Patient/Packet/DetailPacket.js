import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { useParams } from "react-router-dom";
import { Container, Stack, Divider } from "@mui/material";
import _ from "lodash";
import SubHeader from "../../HomePage/Section/SubHeader";
import { getSinglePacket } from "../../../services/packetService";
import BackToTop from "../../../components/BackToTop ";

const DetailPacket = ({ loadingToggleAction }) => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    loadingToggleAction(true);
    const getData = async () => {
      const res = await getSinglePacket(id);
      if (res && res.success) {
        setData(res.packet);
      }
      loadingToggleAction(false);
    };
    getData();
  }, []);
  return (
    <>
      <SubHeader />
      <Stack className="detail-doctor" sx={{ p: 8, paddingBottom: 1 }}>
        <Container>
          <span
            className="detail"
            dangerouslySetInnerHTML={{ __html: data?.detail }}
          ></span>
        </Container>
      </Stack>
      <Divider />

      <Divider />
      <BackToTop />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingToggleAction: (id) => dispatch(actions.loadingToggleAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPacket);
