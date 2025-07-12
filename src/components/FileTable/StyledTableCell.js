import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ddd",
    color: "#000",
    fontWeight: "bold",
    fontSize: "14px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "13px",
  },
}));
