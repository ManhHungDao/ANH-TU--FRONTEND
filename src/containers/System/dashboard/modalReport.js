import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as XLSX from "xlsx";
import {
  getAllPatientAccount,
  getAllDoctorAccount,
  getAllMedicalHistory,
  statisticTimeBooking,
} from "../../../services/userService";
import { toast } from "react-toastify";
import dayjs from "dayjs";

function exportToExcel(data, name) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${name}.xlsx`);
}

const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  height: "fit-content",
  maxHeight: "80vh",
  overflowY: "scroll",
  top: 0,
  bottom: 0,
  margin: "auto",
  left: 0,
  right: 0,
  maxWidth: 700,
};

export default function ModalReport({ open, setOpen }) {
  const handleExportHistoryMedical = async () => {
    try {
      let data;
      const res = await getAllMedicalHistory();
      if (res && res.success) {
        data = res.list;
      }
      data = data.map((e) => ({
        Ngày: dayjs.unix(e.date).format("DD/MM/YYYY"),
        // Giờ: dayjs(new Date(e.date)).format("DD/MM/YYYY"),
        "Tên bác sĩ": e.doctor.name,
        "Tên gói khám": e.packet.name,
        "Giá khám": e.detail.price.name,
        // "Hình thức thanh toán": e.detail.payment.name,
        // "Ghi chú": e.detail.note,
        "Email bệnh nhân": e.schedule.user.email,
        "Tên bệnh nhân": e.schedule.user.name,
        "Giới tính": e.schedule.user.gender === "M" ? "Nam" : "Nữ",
        "Số điện thoại": e.schedule.user.phone,
        "Ngày sinh bệnh nhân": dayjs(
          new Date(e.schedule.user.dayOfBirth)
        ).format("DD/MM/YYYY"),
        "Địa chỉ bệnh nhân": e.schedule.user.address,
      }));

      exportToExcel(data, "medical-history");
      setOpen(false);
    } catch (error) {
      toast.error("Đã xãy ra lỗi");
    }
  };
  const handleExportAccountPatient = async () => {
    try {
      let data;
      const res = await getAllPatientAccount();
      if (res && res.success) {
        data = res.list;
      }
      data = data.map((e) => ({
        Email: e.email,
        Tên: e.name,
        "Giới tính": e.gender === "M" ? "Nam" : "Nữ",
        "Số điện thoại": e.phone,
        "Ngày sinh": dayjs(new Date(e.dayOfBirth)).format("DD/MM/YYYY"),
        "Địa chỉ": e.address.detail,
      }));

      exportToExcel(data, "account-patient");
      setOpen(false);
    } catch (error) {
      toast.error("Đã xãy ra lỗi");
    }
  };
  const handleExportAccountDoctor = async () => {
    try {
      let data;
      const res = await getAllDoctorAccount();
      if (res && res.success) {
        data = res.list;
      }
      data = data.map((e) => ({
        Email: e.email,
        Tên: e.name,
        "Giới tính": e.gender === "M" ? "Nam" : "Nữ",
        "Số điện thoại": e.phone,
        "Ngày sinh": dayjs(new Date(e.dateOfBirth)).format("DD/MM/YYYY"),
        "Địa chỉ": e.address.detail,
        "Cơ sở": e.detail.clinic.name,
        "Chuyên khoa": e.detail.specialty.name,
        "Chức danh": e.detail.position.name,
      }));

      exportToExcel(data, "account-doctor");
      setOpen(false);
    } catch (error) {
      toast.error("Đã xãy ra lỗi");
    }
  };

  const handleExportTimeBooking = async () => {
    try {
      let data;
      const res = await statisticTimeBooking();
      if (res && res.success) {
        data = res.list;
      }
      data = data.map((e) => ({
        "Thời gian": e.time,
        "Số lượng": e.count,
        "Phần trăm": e.percent,
      }));

      exportToExcel(data, "statistic-timebooking");
      setOpen(false);
    } catch (error) {
      toast.error("Đã xãy ra lỗi");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <ButtonGroup variant="text" aria-label="text button group">
              <Button
                onClick={() => {
                  handleExportHistoryMedical();
                }}
              >
                Lịch sử đặt khám
              </Button>
              <Button
                onClick={() => {
                  handleExportAccountPatient();
                }}
              >
                Tài khoản người dùng
              </Button>
              <Button
                onClick={() => {
                  handleExportAccountDoctor();
                }}
              >
                Tài khoản bác sĩ
              </Button>
              <Button
                onClick={() => {
                  handleExportTimeBooking();
                }}
              >
                Thống kê thời gian
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
