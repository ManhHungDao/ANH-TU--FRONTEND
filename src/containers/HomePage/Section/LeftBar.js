import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FormattedMessage } from "react-intl";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import useIsTablet from "../../../components/useScreen/useIsTablet.js";
import "./style.scss";

export default function TemporaryDrawer({ show, setOpen, direction }) {
  const navigate = useNavigate();
  const smScreen = useIsTablet();

  const [state, setState] = React.useState({
    left: false,
  });
  React.useEffect(() => {
    setState({ ...state, ["left"]: show });
  }, [show]);

  return (
    <>
      <Drawer
        anchor={direction}
        open={state["left"]}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => {
            setOpen(false);
          }}
          onKeyDown={() => {
            setOpen(false);
          }}
          className="leftbar"
        >
          <div className="d-flex flex-column justify-content-center align-items-start">
            <div
              className="child-content nav-1"
              onClick={() => {
                navigate(`/viewmore/specialty`);
              }}
            >
              <div>
                <b className="header-title">
                  <FormattedMessage id="home-header.specialty" />
                </b>
              </div>
              <span className="subs-title">
                <FormattedMessage id="home-header.search-doctor" />
              </span>
            </div>
            <div
              className="child-content nav-2"
              onClick={() => {
                navigate(`/viewmore/clinic`);
              }}
            >
              <div>
                <b className="header-title">
                  <FormattedMessage id="home-header.health-facility" />
                </b>
              </div>
              <span className="subs-title">
                <FormattedMessage id="home-header.select-room" />
              </span>
            </div>
            <div
              className="child-content nav-3"
              onClick={() => {
                navigate(`/viewmore/doctor`);
              }}
            >
              <div>
                <b className="header-title">
                  <FormattedMessage id="home-header.doctor" />
                </b>
              </div>
              <span className="subs-title">
                <FormattedMessage id="home-header.select-doctor" />
              </span>
            </div>
            <div
              className="child-content nav-4"
              onClick={() => {
                navigate(`/packet`);
              }}
            >
              <div>
                <b className="header-title">
                  <FormattedMessage id="home-header.fee" />
                </b>
              </div>
              <span className="subs-title">
                <FormattedMessage id="home-header.check-health" />
              </span>
            </div>
            <div
              className="child-content nav-5"
              onClick={() => {
                navigate(`/handbook`);
              }}
            >
              <div>
                <b className="header-title">Cẩm Nang</b>
              </div>
              <span className="subs-title">Bài viết y tế</span>
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}
