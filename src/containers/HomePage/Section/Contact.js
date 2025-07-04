import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import ForumIcon from "@mui/icons-material/Forum";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";

const actions = [
  // { icon: <SaveIcon />, name: "Save" },
  { icon: <PhoneIcon />, name: "Tư vấn hỗ trợ" },
  { icon: <MailIcon />, name: "Email phản hồi" },
  { icon: <FacebookIcon />, name: "Fanpage" },
];

function sendEmail(lang) {
  const email = "healthycare@gmail.com";
  const subject = `${
    lang === "vi"
      ? "PHẢN HỒI TỪ NGƯỜI DÙNG HEALTHYCATE"
      : "FEEDBACK FROM HEALTHYCATE USERS"
  }`;
  const body = `${
    lang === "vi"
      ? "Lý do tôi viết email này..."
      : "The reason I am writing this email..."
  }`;
  const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  return window.open(gmailUrl, "_blank", "noreferrer");
}
function openFacebook() {
  return window.open(
    "https://www.facebook.com/messages/t/100011077685719",
    "_blank",
    "noreferrer"
  );
}

const Contact = ({ language }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (name) => {
    if (name === "Email phản hồi") sendEmail(language);
    if (name === "Fanpage") openFacebook();
    if (name === "Tư vấn hỗ trợ") {
      navigate("tel:0964367332");
    }
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
      }}
      icon={<ForumIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          tooltipOpen
          onClick={() => handleClick(action.name)}
          sx={{
            ".MuiSpeedDialAction-staticTooltipLabel": {
              minWidth: "150px",
              height: 30,
              textAlign: "center",
            },
          }}
        />
      ))}
    </SpeedDial>
  );
};
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};
export default connect(mapStateToProps)(Contact);
