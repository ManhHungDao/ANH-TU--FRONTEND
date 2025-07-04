import React, { useState, useEffect, useRef } from "react";
import FormData from "./Section/FormData";
import Header from "../../../components/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const ManageCode = ({
  allcodeType,
  fetchAllcodeByTypeAction,
  isSuccess,
  clearStatus,
  menuOpen,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [valueVI, setValueVI] = useState("");
  const [valueEN, setValueEN] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState("");
  const location = useLocation();
  const path = location.pathname;

  const checkType = () => {
    setValueEN("");
    setValueVI("");
    setIsEdit(false);
    setPage(0);
    setRowsPerPage(10);
    if (path.includes("price")) {
      setType("PRICE");
    } else if (path.includes("province")) {
      setType("PROVINCE");
    } else if (path.includes("time")) {
      setType("TIME");
    } else if (path.includes("specialty")) {
      setType("SPECIALTY");
    } else if (path.includes("payment")) {
      setType("PAYMENT");
    } else if (path.includes("packet")) {
      setType("PACKET");
    }
  };

  useEffect(() => {
    checkType();
  }, [location]);
  useEffect(() => {
    if (type !== "") {
      fetchDataAPI(page + 1, rowsPerPage);
    }
  }, [type]);
  useEffect(() => {
    if (allcodeType.list && allcodeType.list.length > 0) {
      setData(allcodeType.list);
    } else {
      setData([]);
    }
  }, [allcodeType]);
  useEffect(() => {
    if (isSuccess === true) {
      fetchDataAPI(page + 1, rowsPerPage);
      clearStatus();
      setOpenConfirmModal(false);
      setValueVI("");
      setValueEN("");
      setIsEdit(false);
    }
  }, [isSuccess]);
  const fetchDataAPI = (page, size) => {
    const data = {
      page,
      size,
      filter: type,
    };
    fetchAllcodeByTypeAction(data);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    fetchDataAPI(page + 1, +event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchDataAPI(newPage + 1, rowsPerPage);
  };

  return (
    <>
      <Box m="20px">
        <Header title="Quản lý tác vụ" />
        {data && (
          <FormData
            title={`Quản lý mã ${menuOpen.toLowerCase()}`}
            page={page}
            setPage={setPage}
            type={type}
            data={data}
            openConfirmModal={openConfirmModal}
            setOpenConfirmModal={setOpenConfirmModal}
            valueVI={valueVI}
            setValueVI={setValueVI}
            valueEN={valueEN}
            setValueEN={setValueEN}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            count={allcodeType.count}
          />
        )}
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    allcodeType: state.admin.allcodeType,
    isSuccess: state.app.isSuccess,
    menuOpen: state.app.menuOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllcodeByTypeAction: (type) =>
      dispatch(actions.fetchAllcodeByTypeAction(type)),
    clearStatus: () => dispatch(actions.clearStatus()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCode);
