import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const MenuBreadcrumbs = ({ selected, setSelected }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 1 }}>
      <Link
        underline={selected.l1 ? "hover" : "none"}
        color={selected.l1 ? "inherit" : "text.primary"}
        onClick={() => setSelected({ l1: null, l2: null, l3: null })}
        sx={{ cursor: selected.l1 ? "pointer" : "default" }}
      >
        Menu cấp 1
      </Link>
      {selected.l1 && (
        <Link
          underline={selected.l2 ? "hover" : "none"}
          color={selected.l2 ? "inherit" : "text.primary"}
          onClick={() => setSelected({ ...selected, l2: null, l3: null })}
          sx={{ cursor: selected.l2 ? "pointer" : "default" }}
        >
          {selected.l1}
        </Link>
      )}
      {selected.l2 && (
        <Link
          underline={selected.l3 ? "hover" : "none"}
          color={selected.l3 ? "inherit" : "text.primary"}
          onClick={() => setSelected({ ...selected, l3: null })}
          sx={{ cursor: selected.l3 ? "pointer" : "default" }}
        >
          {selected.l2}
        </Link>
      )}
      {selected.l3 && (
        <Typography color="text.primary">{selected.l3}</Typography>
      )}
    </Breadcrumbs>
  );
};

export default MenuBreadcrumbs;
