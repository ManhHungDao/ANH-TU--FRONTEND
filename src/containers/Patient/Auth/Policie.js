import React, { useEffect, useState } from "react";
import {
  Unstable_Grid2 as Grid,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import { policies } from "../../../utils";

const Policie = ({ open, setOpen, checked, setChecked }) => {
  const [scroll, setScroll] = React.useState("paper");

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Chính sách và điều khoản
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <span
              className="detail"
              dangerouslySetInnerHTML={{ __html: policies }}
            ></span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Tôi đồng ý với mọi điều khoản được đưa ra."
            />
          </FormGroup>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Policie;
