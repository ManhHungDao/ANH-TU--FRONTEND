import { TableRow } from "@mui/material";
import { StyledTableCell } from "./StyledTableCell";

const TableHeader = () => (
  <TableRow>
    <StyledTableCell>Tên file</StyledTableCell>
    <StyledTableCell>Loại án</StyledTableCell>
    <StyledTableCell align="center">Hành động</StyledTableCell>
  </TableRow>
);

export default TableHeader;
